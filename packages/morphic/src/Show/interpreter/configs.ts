// ets_tracing: off

import type * as S from "@effect-ts/core/Show"

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { ShowURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [ShowURI]: {
      shows: IntersectionLA<L, A, ShowURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface IsoConfig<L, A, N> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface PrismConfig<L, A, N> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [ShowURI]: {
      show: InterfaceLA<Props, ShowURI>
    }
  }
  interface PartialConfig<Props> {
    [ShowURI]: {
      show: InterfaceLA<Props, ShowURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [ShowURI]: {
      show: InterfaceLA<Props & PropsPartial, ShowURI>
      showPartial: InterfaceLA<PropsPartial, ShowURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface ArrayConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface NullableConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface MutableConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface OptionalConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [ShowURI]: {
      left: S.Show<EA>
      right: S.Show<AA>
    }
  }
  interface OptionConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [ShowURI]: {
      shows: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? S.Show<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [ShowURI]: {
      show: S.Show<A>
      showRefined: S.Show<B>
    }
  }
  interface PredicateConfig<E, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [ShowURI]: {
      show: S.Show<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [ShowURI]: {
      shows: TaggedUnionLA<Types, ShowURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [ShowURI]: {
      shows: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? S.Show<A>
          : never
      }
    }
  }
}
