// ets_tracing: off

import type { ExtensionsURI } from "../../Algebra/Extensions/index.js"
import type { IntersectionURI } from "../../Algebra/Intersection/index.js"
import type { NewtypeURI } from "../../Algebra/Newtype/index.js"
import type { ObjectURI } from "../../Algebra/Object/index.js"
import type { PrimitivesURI } from "../../Algebra/Primitives/index.js"
import type { RecordURI } from "../../Algebra/Record/index.js"
import type { RecursiveURI } from "../../Algebra/Recursive/index.js"
import type { RefinedURI } from "../../Algebra/Refined/index.js"
import type { SetURI } from "../../Algebra/Set/index.js"
import type { TaggedUnionURI } from "../../Algebra/TaggedUnion/index.js"
import type { UnionURI } from "../../Algebra/Union/index.js"
import type { UnknownURI } from "../../Algebra/Unknown/index.js"
import type { GetAlgebra, InterpreterURIS } from "../../HKT/index.js"
import type { InferredAlgebra, InferredProgram } from "../usage/program-infer/index.js"
import type { AnyConfigEnv } from "../usage/summoner/index.js"

export const ProgramURI = "ProgramURI" as const

export type ProgramURI = typeof ProgramURI

export interface CoreAlgebra<F extends InterpreterURIS, Env>
  extends InferredAlgebra<F, ProgramURI, Env> {}

export interface P<R extends AnyConfigEnv, E, A>
  extends InferredProgram<R, E, A, ProgramURI> {}

declare module "../usage/program-type/index.js" {
  interface ProgramAlgebraURI {
    [ProgramURI]: GetAlgebra<
      | PrimitivesURI
      | TaggedUnionURI
      | IntersectionURI
      | ObjectURI
      | NewtypeURI
      | RecordURI
      | RecursiveURI
      | RefinedURI
      | UnknownURI
      | SetURI
      | UnionURI
      | ExtensionsURI
    >
  }

  interface ProgramAlgebra<F extends InterpreterURIS, Env> {
    [ProgramURI]: CoreAlgebra<F, Env>
  }

  interface ProgramType<R extends AnyConfigEnv, E, A> {
    [ProgramURI]: P<R, E, A>
  }
}
