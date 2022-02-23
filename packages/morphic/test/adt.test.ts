import * as E from "@effect-ts/core/Either"
import * as Sync from "@effect-ts/core/Sync"

import { decode, report } from "../src/Decoder/index.js"
import { guard } from "../src/Guard/index.js"
import type { AType, EType } from "../src/index.js"
import * as MO from "../src/index.js"
import { hash } from "../src/TypeHash/index.js"

const Foo_ = MO.make((F) =>
  F.interface(
    {
      _tag: F.stringLiteral("Foo"),
      foo: F.string()
    },
    {
      name: "Foo"
    }
  )
)

interface Foo extends AType<typeof Foo_> {}
interface FooRaw extends EType<typeof Foo_> {}
const Foo = MO.opaque<FooRaw, Foo>()(Foo_)

const Bar_ = MO.make((F) =>
  F.interface(
    {
      _tag: F.stringLiteral("Bar"),
      bar: F.string()
    },
    {
      name: "Bar"
    }
  )
)

interface Bar extends AType<typeof Bar_> {}
interface BarRaw extends EType<typeof Bar_> {}
const Bar = MO.opaque<BarRaw, Bar>()(Bar_)

export const FooBar = MO.makeADT("_tag")({ Foo, Bar })
export type FooBar = MO.AType<typeof FooBar>

const CustomUnion = MO.make((F) =>
  F.union(
    F.string(),
    F.number()
  )({
    guards: [
      guard(MO.make((F) => F.string())).is,
      guard(MO.make((F) => F.number())).is
    ],
    conf: {
      [MO.DecoderURI]: (_, __, ___) => _
    }
  })
)

describe("Adt", () => {
  it("non tagged unions", () => {
    expect(Sync.runEither(report(decode(CustomUnion)("ok")))).toEqual(E.right("ok"))
    expect(Sync.runEither(report(decode(CustomUnion)(1)))).toEqual(E.right(1))
    expect(Sync.runEither(report(decode(CustomUnion)(null)))).toEqual(
      E.left(["Expecting one of:\n    String\n    Number\nbut instead got: null"])
    )
  })
  it("decoder", () => {
    expect(Sync.runEither(decode(FooBar)({ _tag: "Foo", foo: "foo" }))).toEqual(
      E.right<Foo>({ _tag: "Foo", foo: "foo" })
    )
    expect(Sync.runEither(decode(FooBar)({ _tag: "Bar", bar: "bar" }))).toEqual(
      E.right<Bar>({ _tag: "Bar", bar: "bar" })
    )
    expect(Sync.runEither(report(decode(FooBar)({ _tag: "Baz", baz: "baz" })))).toEqual(
      E.left([
        'Expecting TaggedUnion but instead got: {"_tag":"Baz","baz":"baz"} (Baz is not known in (Foo, Bar))'
      ])
    )
    expect(Sync.runEither(report(decode(FooBar)({ _tag: "Bar", baz: "baz" })))).toEqual(
      E.left([
        "Expecting String at bar but instead got: undefined (undefined is not a string)"
      ])
    )
  })
  it("Hashes adt", () => {
    expect(hash(FooBar).typeHash).toEqual(
      'Tagged(_tag)({"_tag":"Bar","bar":"string"} | {"_tag":"Foo","foo":"string"})'
    )
  })
})
