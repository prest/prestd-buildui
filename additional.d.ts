declare type Any = string | number | date | boolean;
declare type AnyArray = string[] | number[] | date[] | boolean[];
declare type AnyObject = Record<
  string | number,
  Any | AnyArray | AnyObject | AnyObject[]
>;
