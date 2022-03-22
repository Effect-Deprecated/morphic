// ets_tracing: off

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { TypeHash, TypeHashURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [TypeHashURI]: {
      typeHashes: IntersectionLA<L, A, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface IsoConfig<L, A, N> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface PrismConfig<L, A, N> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props, TypeHashURI>
    }
  }
  interface PartialConfig<Props> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props, TypeHashURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [TypeHashURI]: {
      typeHash: InterfaceLA<Props & PropsPartial, TypeHashURI>
      typeHashPartial: InterfaceLA<PropsPartial, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface ArrayConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface NullableConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface MutableConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface OptionalConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [TypeHashURI]: {
      left: TypeHash
      right: TypeHash
    }
  }
  interface OptionConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [TypeHashURI]: {
      typeHashes: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? TypeHash
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [TypeHashURI]: {
      typeHash: TypeHash
      typeHashRefined: TypeHash
    }
  }
  interface PredicateConfig<E, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [TypeHashURI]: {
      typeHash: TypeHash
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [TypeHashURI]: {
      typeHash: TypeHash
      coTypeHash: TypeHash
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [TypeHashURI]: {
      typeHashes: TaggedUnionLA<Types, TypeHashURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [TypeHashURI]: {
      typeHashes: {
        [k in keyof Types]: TypeHash
      }
    }
  }
}
