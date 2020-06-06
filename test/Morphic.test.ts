import { pipe } from "fp-ts/lib/pipeable"

import { summonFor, ModelURI, AType, EType, AsOpaque } from "../src"

import * as A from "@matechs/core/Array"
import * as E from "@matechs/core/Either"
import { flow } from "@matechs/core/Function"
import * as Model from "@matechs/core/Model"
import * as Index from "@matechs/core/Monocle/Index"
import * as Lens from "@matechs/core/Monocle/Lens"
import * as NT from "@matechs/core/Newtype"

const { summon } = summonFor({})

export function maxLength(length: number) {
  return (codec: Model.Type<string>) =>
    Model.withValidate_(codec, (u, c) =>
      E.chain_(codec.validate(u, c), (x) =>
        x.length <= length ? Model.success(x) : Model.failure(u, c)
      )
    )
}

interface Address
  extends NT.Newtype<
    {
      readonly Address: unique symbol
    },
    string
  > {}

const Address = summon((F) =>
  F.newtype<Address>("Address")(
    F.string({
      [ModelURI]: flow(
        maxLength(20),
        Model.withMessage(() => "Invalid Address")
      )
    })
  )
)

const Person_ = summon((F) =>
  F.interface(
    {
      name: F.string(),
      address: F.nonEmptyArray(Address(F), {
        [ModelURI]: Model.withFirstMessage(() => "Invalid Address Array")
      })
    },
    "Person"
  )
)

interface Person extends AType<typeof Person_> {}
interface PersonE extends EType<typeof Person_> {}

const Person = AsOpaque<PersonE, Person>()(Person_)

describe("Morphic", () => {
  it("should use model interpreter", () => {
    const result_0 = Person.type.decode({
      name: "Michael",
      address: [
        A.range(0, 25)
          .map((n) => `${n}`)
          .join("")
      ]
    })
    const result_1 = Person.type.decode({
      name: "Michael",
      address: []
    })
    const result_2 = Person.type.decode({
      name: "Michael",
      address: ["177 Finchley Road"]
    })

    expect(E.isLeft(result_0) && Model.reportFailure(result_0.left)).toStrictEqual([
      "Invalid Address"
    ])
    expect(E.isLeft(result_1) && Model.reportFailure(result_1.left)).toStrictEqual([
      "Invalid Address Array"
    ])
    expect(E.isRight(result_2) && result_2.right).toStrictEqual({
      name: "Michael",
      address: ["177 Finchley Road"]
    })
  })
  it("should use monocle", () => {
    const addressIndex = Index.nonEmptyArray<Address>()
    const addresses = Person.lensFromPath(["address"])

    const addressN = (n: number) =>
      pipe(addresses, Lens.composeOptional(addressIndex.index(n)))

    expect(
      pipe(
        Person.type.decode({
          name: "Michael",
          address: ["177 Finchley Road"]
        }),
        E.chain(
          flow(
            addressN(1).getOption,
            E.fromOption(() => "Second Address Not Found")
          )
        )
      )
    ).toStrictEqual(E.left("Second Address Not Found"))

    expect(
      pipe(
        Person.type.decode({
          name: "Michael",
          address: ["177 Finchley Road", "ok"]
        }),
        E.chain(
          flow(
            addressN(1).getOption,
            E.fromOption(() => "Second Address Not Found")
          )
        )
      )
    ).toStrictEqual(E.right("ok"))
  })
})
