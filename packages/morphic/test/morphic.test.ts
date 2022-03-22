import * as HM from "@effect-ts/core/Collections/Immutable/HashMap"
import * as E from "@effect-ts/core/Either"
import { pipe } from "@effect-ts/core/Function"
import type { TypeOf } from "@effect-ts/core/Newtype"
import { typeDef } from "@effect-ts/core/Newtype"
import * as O from "@effect-ts/core/Option"
import * as T from "@effect-ts/core/Sync"
import * as I from "@effect-ts/monocle/Iso"
import * as L from "@effect-ts/monocle/Lens"
import * as fc from "fast-check"

import { asserts } from "../src/Asserts/index.js"
import { decode, decoder, report } from "../src/Decoder/index.js"
import { encode, encoder } from "../src/Encoder/index.js"
import { equal } from "../src/Equal/index.js"
import { arbitrary } from "../src/FastCheck/index.js"
import { guard } from "../src/Guard/index.js"
import type { AType, EType } from "../src/index.js"
import { make, opaque, ShowURI } from "../src/index.js"
import { show } from "../src/Show/index.js"
import { strict } from "../src/Strict/index.js"
import { strictDecoder } from "../src/StrictDecoder/index.js"

const First = make((F) => F.string())

const Person_ = make((F) =>
  F.interface(
    {
      name: F.interface({
        first: First(F),
        last: F.string()
      })
    },
    {
      name: "Person",
      conf: {
        [ShowURI]: (_) => ({
          show: (p) => `${p.name.first} ${p.name.last}`
        })
      }
    }
  )
)

interface Person extends AType<typeof Person_> {}
interface PersonRaw extends EType<typeof Person_> {}
const Person = opaque<PersonRaw, Person>()(Person_)

const firstNameLens = pipe(Person.lens, L.prop("name"), L.prop("first"))

const IdT = typeDef<bigint>()("IdT")
interface IdT extends TypeOf<typeof IdT> {}

export const Id = make((F) =>
  F.interface({
    id: F.interface({
      id: F.newtypeIso(I.newtype<IdT>(), F.bigint())
    })
  })
)

export const InterA = make((F) => F.intersection(Person(F), Id(F))())
export const InterB = make((F) => F.intersection(Id(F), Person(F))())

export const Tuple = make((F) =>
  F.tuple(
    F.string(),
    F.number(),
    F.string(),
    F.stringLiteral("abc")
  )({
    conf: {
      Eq: (_) => _,
      EncoderURI: (_, __, ___) => _,
      DecoderURI: (_, __, ___) => _
    }
  })
)

describe("FastCheck", () => {
  it("Generate Person", () => {
    fc.check(
      fc.property(
        arbitrary(Person),
        (p) => guard(Person).is(p) && typeof firstNameLens.get(p) === "string"
      )
    )
  })
  it("Encode/Decode Person", () => {
    fc.check(
      fc.property(arbitrary(Person), (p) => {
        const res = T.runEither(
          decoder(Person).decode(T.run(encoder(Person).encode(p)))
        )
        expect(res).toEqual(E.right(p))
      })
    )
  })
  it("Track fields", () => {
    expect(
      T.runEither(report(decode(Person)({ name: { first: "Michael", last: 1 } })))
    ).toEqual(
      E.left([
        "Expecting String at name.last but instead got: 1 (number is not a string)"
      ])
    )
  })
  it("Decodes Person", () => {
    expect(
      T.runEither(
        decoder(Person).decode({ name: { first: "Michael", last: "Arnaldi" } })
      )
    ).toEqual(E.right({ name: { first: "Michael", last: "Arnaldi" } }))
  })
  it("Removes unknown fields", () => {
    expect(
      T.run(
        strict(Person).shrink({
          name: { first: "Michael", last: "Arnaldi", middle: "None" }
        })
      )
    ).toEqual({ name: { first: "Michael", last: "Arnaldi" } })
  })
  it("Decode & Removes unknown fields", () => {
    expect(
      T.runEither(
        strictDecoder(Person).decode({
          name: { first: "Michael", last: "Arnaldi", middle: "None" }
        })
      )
    ).toEqual(E.right({ name: { first: "Michael", last: "Arnaldi" } }))
  })
  it("Fail Decoding of Person", () => {
    expect(pipe(report(decode(Person)({})), T.runEither)).toEqual(
      E.left([
        "Expecting Interface at name but instead got: undefined (undefined is not a record)"
      ])
    )
  })
  it("Uses Equal", () => {
    expect(
      equal(Person).equals(
        { name: { first: "Michael", last: "Arnaldi" } },
        { name: { first: "Michael", last: "Arnaldi" } }
      )
    ).toEqual(true)
    expect(
      equal(Person).equals(
        { name: { first: "John", last: "Doe" } },
        { name: { first: "Michael", last: "Arnaldi" } }
      )
    ).toEqual(false)
  })
  it("Shows Person", () => {
    expect(show(Person).show({ name: { first: "Michael", last: "Arnaldi" } })).toEqual(
      "Michael Arnaldi"
    )
  })
  it("Assert Person", () => {
    const person: unknown = { name: { first: "Michael", last: "Arnaldi" } }

    asserts(Person, person)

    expect(person.name.first).toEqual("Michael")
  })
  it("Intersection is commutative", () => {
    expect(
      T.runEither(
        decoder(InterA).decode({
          name: { first: "Michael", last: "Arnaldi" },
          id: {
            id: "0"
          }
        })
      )
    ).toEqual(
      E.right({ name: { first: "Michael", last: "Arnaldi" }, id: { id: BigInt(0) } })
    )
    expect(
      T.runEither(
        decoder(InterB).decode({
          name: { first: "Michael", last: "Arnaldi" },
          id: {
            id: "0"
          }
        })
      )
    ).toEqual(
      E.right({ name: { first: "Michael", last: "Arnaldi" }, id: { id: BigInt(0) } })
    )
  })
})

const A = make((F) => F.both({ a: F.string() }, { b: F.nullable(F.string()) }))

it("Removes unknown fields with partial", () => {
  expect(
    T.run(
      strict(A).shrink({
        a: "a",
        b: O.none,
        c: "c"
      })
    )
  ).toEqual({ a: "a", b: O.none })
  expect(
    T.run(
      strict(A).shrink({
        a: "a",
        b: O.some("b"),
        c: "c"
      })
    )
  ).toEqual({ a: "a", b: O.some("b") })
  expect(
    T.run(
      strict(A).shrink({
        a: "a",
        b: undefined,
        c: "c"
      })
    )
  ).toEqual({ a: "a", b: undefined })
  expect(
    T.run(
      strict(A).shrink({
        a: "a",
        c: "c"
      })
    )
  ).toEqual({ a: "a" })
})

it("Decodes/Encodes partial properly", () => {
  expect(T.run(encoder(A).encode({ a: "a" }))).toEqual({
    a: "a"
  })
  expect(T.run(encoder(A).encode({ a: "a", b: undefined }))).toEqual({
    a: "a",
    b: undefined
  })
  expect(T.run(encoder(A).encode({ a: "a", b: O.none }))).toEqual({
    a: "a",
    b: null
  })

  expect(T.runEither(decoder(A).decode({ a: "a" }))).toEqual(
    E.right({
      a: "a"
    })
  )
  expect(T.runEither(decoder(A).decode({ a: "a", b: undefined }))).toEqual(
    E.right({
      a: "a",
      b: undefined
    })
  )
  expect(T.runEither(decoder(A).decode({ a: "a", b: null }))).toEqual(
    E.right({
      a: "a",
      b: O.none
    })
  )
})

describe("Tuple", () => {
  it("Decoder", () => {
    expect(T.runEither(decode(Tuple)(["1", 2, "3", "abc"]))).toEqual(
      E.right(["1", 2, "3", "abc"])
    )
    expect(T.runEither(report(decode(Tuple)(["1", "2", "3", "abc"])))).toEqual(
      E.left(['Expecting Number at 1 but instead got: "2" (string is not a number)'])
    )
  })
  it("Encoder", () => {
    expect(T.run(encode(Tuple)(["1", 2, "3", "abc"]))).toEqual(["1", 2, "3", "abc"])
  })
  it("Equal", () => {
    expect(equal(Tuple).equals(["1", 2, "3", "abc"], ["1", 2, "3", "abc"])).toEqual(
      true
    )
    expect(equal(Tuple).equals(["1", 0, "3", "abc"], ["1", 2, "3", "abc"])).toEqual(
      false
    )
  })
})

export const Hashmap = make((F) => F.hashMap(F.string(), F.number()))

describe("HashMap", () => {
  it("Equal regardless of ordering", () => {
    expect(
      equal(Hashmap).equals(
        pipe(HM.make<string, number>(), HM.set("1", 3), HM.set("2", 1)),
        pipe(HM.make<string, number>(), HM.set("2", 1), HM.set("1", 3))
      )
    ).toEqual(true)
  })
  it("Equal after removal", () => {
    expect(
      equal(Hashmap).equals(
        pipe(HM.make<string, number>(), HM.set("1", 3), HM.set("2", 1)),
        pipe(
          HM.make<string, number>(),
          HM.set("0", 5),
          HM.set("2", 1),
          HM.set("1", 3),
          HM.remove("0")
        )
      )
    ).toEqual(true)
  })
  it("Encode/Decode HashMap", () => {
    fc.check(
      fc.property(arbitrary(Hashmap), (p) => {
        const res = T.runEither(
          decoder(Hashmap).decode(T.run(encoder(Hashmap).encode(p)))
        )
        expect(res).toEqual(E.right(p))
      })
    )
  })
  it("Show", () => {
    expect(
      show(Hashmap).show(
        pipe(HM.make<string, number>(), HM.set("1", 3), HM.set("2", 1))
      )
    ).toEqual('new HashMap([["1", 3], ["2", 1]])')
  })
})
