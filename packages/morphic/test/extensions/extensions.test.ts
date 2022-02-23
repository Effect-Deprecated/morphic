import "./DateFromTime/index.js"
import "./DateFromTime/Decoder.js"

import * as E from "@effect-ts/core/Either"

import { runDecode } from "../../src/Decoder/index.js"
import * as MO from "../../src/index.js"

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
