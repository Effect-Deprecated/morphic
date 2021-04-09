import "./DateFromTime"
import "./DateFromTime/Decoder"

import * as E from "@effect-ts/core/Either"

import * as MO from "../../src"
import { runDecode } from "../../src/Decoder"

describe("Extension", () => {
  it("should use extension", () => {
    const Demo_ = MO.make((F) =>
      F.interface({ date: F.dateFromTime() }, { name: "Demo" })
    )

    interface Demo extends MO.AType<typeof Demo_> {}
    interface DemoE extends MO.EType<typeof Demo_> {}
    const Demo = MO.opaque<DemoE, Demo>()(Demo_)

    expect(runDecode(Demo)({ date: 0 })).toEqual(E.right({ date: new Date(0) }))
  })
})
