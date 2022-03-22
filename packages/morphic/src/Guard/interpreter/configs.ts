// ets_tracing: off

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { Guard, GuardURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [GuardURI]: {
      guards: IntersectionLA<L, A, GuardURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface NewtypeConfig<L, A, N> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface CoerceConfig<L, A, N> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface IsoConfig<L, A, N> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface PrismConfig<L, A, N> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [GuardURI]: {
      guard: InterfaceLA<Props, GuardURI>
    }
  }
  interface PartialConfig<Props> {
    [GuardURI]: {
      guard: InterfaceLA<Props, GuardURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [GuardURI]: {
      guard: InterfaceLA<Props, GuardURI>
      guardPartial: InterfaceLA<PropsPartial, GuardURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface ArrayConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface NullableConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface MutableConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface OptionalConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [GuardURI]: {
      left: Guard<EA>
      right: Guard<AA>
    }
  }
  interface OptionConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [GuardURI]: {
      guards: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? Guard<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
  interface PredicateConfig<E, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [GuardURI]: {
      guard: Guard<A>
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [GuardURI]: {
      guard: Guard<K>
      coGuard: Guard<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [GuardURI]: {
      guards: TaggedUnionLA<Types, GuardURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [GuardURI]: {
      guards: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? Guard<A>
          : never
      }
    }
  }
}
