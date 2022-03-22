// ets_tracing: off

import type {
  InterfaceLA,
  IntersectionLA,
  TaggedUnionLA
} from "../../Algebra/Config/index.js"
import type { HKT, Kind } from "../../HKT/index.js"
import type { DecoderURI } from "../base/index.js"
import type { Decoder } from "../common/index.js"

declare module "../../Algebra/Intersection/index.js" {
  interface IntersectionConfig<
    L extends readonly unknown[],
    A extends readonly unknown[]
  > {
    [DecoderURI]: {
      decoders: IntersectionLA<L, A, DecoderURI>
    }
  }
}

declare module "../../Algebra/Newtype/index.js" {
  interface NewtypeConfig<L, A, N> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface CoerceConfig<L, A, N> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface IsoConfig<L, A, N> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface PrismConfig<L, A, N> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
}

declare module "../../Algebra/Object/index.js" {
  interface InterfaceConfig<Props> {
    [DecoderURI]: {
      decoder: InterfaceLA<Props, DecoderURI>
    }
  }
  interface PartialConfig<Props> {
    [DecoderURI]: {
      decoder: InterfaceLA<Props, DecoderURI>
    }
  }
  interface BothConfig<Props, PropsPartial> {
    [DecoderURI]: {
      decoder: InterfaceLA<Props, DecoderURI>
      decoderPartial: InterfaceLA<PropsPartial, DecoderURI>
    }
  }
}

declare module "../../Algebra/Primitives/index.js" {
  interface NonEmptyArrayConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface ArrayConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface NullableConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface MutableConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface OptionalConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface EitherConfig<EE, EA, AE, AA> {
    [DecoderURI]: {
      left: Decoder<EA>
      right: Decoder<AA>
    }
  }
  interface OptionConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface TupleConfig<Types extends readonly Kind<any, any, any, any>[]> {
    [DecoderURI]: {
      decoders: {
        [k in keyof Types]: [Types[k]] extends [HKT<any, infer E, infer A>]
          ? Decoder<A>
          : never
      }
    }
  }
}

declare module "../../Algebra/Refined/index.js" {
  interface RefinedConfig<E, A, B> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
  interface PredicateConfig<E, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
}

declare module "../../Algebra/Set/index.js" {
  interface SetConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
}

declare module "../../Algebra/Record/index.js" {
  interface RecordConfig<L, A> {
    [DecoderURI]: {
      decoder: Decoder<A>
    }
  }
}

declare module "../../Algebra/HashMap/index.js" {
  interface HashMapConfig<L, A, K> {
    [DecoderURI]: {
      decoder: Decoder<K>
      coDecoder: Decoder<A>
    }
  }
}

declare module "../../Algebra/TaggedUnion/index.js" {
  interface TaggedUnionConfig<Types> {
    [DecoderURI]: {
      decoders: TaggedUnionLA<Types, DecoderURI>
    }
  }
}

declare module "../../Algebra/Union/index.js" {
  interface UnionConfig<Types> {
    [DecoderURI]: {
      decoders: {
        [k in keyof Types]: Types[k] extends HKT<any, infer E, infer A>
          ? Decoder<A>
          : never
      }
    }
  }
}
