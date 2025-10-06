export {}

declare global {
  type Nullable<T> = T | null
  type Optional<T> = T | undefined
  type Maybe<T> = T | null | undefined
  
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  
  type ArrayElement<ArrayType extends readonly unknown[]> = 
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never
}

