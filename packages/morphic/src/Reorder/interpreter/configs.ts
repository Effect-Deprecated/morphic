// ets_tracing: off

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { Reorder, ReorderURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [ReorderURI]: {
      reorders: IntersectionLA<L, A, ReorderURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface NewtypeConfig<L, A, N> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface CoerceConfig<L, A, N> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface IsoConfig<L, A, N> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface PrismConfig<L, A, N> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [ReorderURI]: {
      reorder: InterfaceLA<Props, ReorderURI>
    }
  }
  interface PartialConfig<Props> {
    [ReorderURI]: {
      reorder: InterfaceLA<Props, ReorderURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [ReorderURI]: {
      reorder: InterfaceLA<Props, ReorderURI>
      reorderPartial: InterfaceLA<PropsPartial, ReorderURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface ArrayConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface NullableConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface MutableConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface OptionalConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [ReorderURI]: {
      left: Reorder<EA>
      right: Reorder<AA>
    }
  }
  interface OptionConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [ReorderURI]: {
      reorders: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? Reorder<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
  interface PredicateConfig<E, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [ReorderURI]: {
      reorder: Reorder<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [ReorderURI]: {
      reorders: TaggedUnionLA<Types, ReorderURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [ReorderURI]: {
      reorders: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? Reorder<A>
          : never
      }
    }
  }
}
