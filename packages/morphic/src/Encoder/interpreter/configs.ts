// ets_tracing: off

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { Encoder, EncoderURI } from "../base/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [EncoderURI]: {
      encoders: IntersectionLA<L, A, EncoderURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface IsoConfig<L, A, N> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface PrismConfig<L, A, N> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [EncoderURI]: {
      encoder: InterfaceLA<Props, EncoderURI>
    }
  }
  interface PartialConfig<Props> {
    [EncoderURI]: {
      encoder: InterfaceLA<Props, EncoderURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [EncoderURI]: {
      encoder: InterfaceLA<Props, EncoderURI>
      encoderPartial: InterfaceLA<PropsPartial, EncoderURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface UnknownEConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface NonEmptyArrayConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface ArrayConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface NullableConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface MutableConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface OptionalConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [EncoderURI]: {
      left: Encoder<EA, EE>
      right: Encoder<AA, AE>
    }
  }
  interface OptionConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [EncoderURI]: {
      encoders: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? Encoder<A, E>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [EncoderURI]: {
      encoder: Encoder<A, E>
    }
  }
  interface PredicateConfig<E, A> {
    [EncoderURI]: {
      encoder: Encoder<A, E>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [EncoderURI]: {
      encoder: Encoder<A, L>
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [EncoderURI]: {
      encoder: Encoder<K, string>
      coEncoder: Encoder<A, L>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [EncoderURI]: {
      encoders: TaggedUnionLA<Types, EncoderURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [EncoderURI]: {
      encoders: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? Encoder<A, E>
          : never
      }
    }
  }
}
