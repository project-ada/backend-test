/* eslint-disable import/no-duplicates, @typescript-eslint/ban-types */
import { Context } from "@api/server-types";
import { Dayjs } from "@plandek-utils/ts-parse-dayjs";
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** float rounded to 1 decimal place */
  FloatRounded1: number;
  /** float rounded to 2 decimal places */
  FloatRounded2: number;
  /** Date in UTC, expected to be used as a js Date in the UI (as normal Dayjs in the server) */
  JSDate: Dayjs;
  /** Date in UTC */
  UTCDate: Dayjs;
  /** Date in UTC that when parsing, if it does not have time already, it will be parsed at end of UTC day */
  UTCEndOfDay: Dayjs;
  /** Date in UTC that when parsing, if it does not have time already, it will be parsed at start of UTC day */
  UTCStartOfDay: Dayjs;
};

export type Mutation = {
  /** returns the given value */
  mutantPing: Scalars["String"];
};

export type MutationMutantPingArgs = {
  value: Scalars["String"];
};

export type Query = {
  /** return an array of messages with the given (TO BE IMPLEMENTED) */
  messageList: Array<Scalars["String"]>;
  /** returns current time */
  now: Scalars["UTCDate"];
  /** returns ok */
  ping: Scalars["String"];
};

export type QueryMessageListArgs = {
  quantity: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  FloatRounded1: ResolverTypeWrapper<Scalars["FloatRounded1"]>;
  FloatRounded2: ResolverTypeWrapper<Scalars["FloatRounded2"]>;
  JSDate: ResolverTypeWrapper<Scalars["JSDate"]>;
  Mutation: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  UTCDate: ResolverTypeWrapper<Scalars["UTCDate"]>;
  UTCEndOfDay: ResolverTypeWrapper<Scalars["UTCEndOfDay"]>;
  UTCStartOfDay: ResolverTypeWrapper<Scalars["UTCStartOfDay"]>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  FloatRounded1: Scalars["FloatRounded1"];
  FloatRounded2: Scalars["FloatRounded2"];
  JSDate: Scalars["JSDate"];
  Mutation: {};
  String: Scalars["String"];
  Query: {};
  Int: Scalars["Int"];
  UTCDate: Scalars["UTCDate"];
  UTCEndOfDay: Scalars["UTCEndOfDay"];
  UTCStartOfDay: Scalars["UTCStartOfDay"];
  Boolean: Scalars["Boolean"];
};

export interface FloatRounded1ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["FloatRounded1"], any> {
  name: "FloatRounded1";
}

export interface FloatRounded2ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["FloatRounded2"], any> {
  name: "FloatRounded2";
}

export interface JsDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["JSDate"], any> {
  name: "JSDate";
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  mutantPing?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<MutationMutantPingArgs, "value">
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  messageList?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMessageListArgs, "quantity">
  >;
  now?: Resolver<ResolversTypes["UTCDate"], ParentType, ContextType>;
  ping?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export interface UtcDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["UTCDate"], any> {
  name: "UTCDate";
}

export interface UtcEndOfDayScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["UTCEndOfDay"], any> {
  name: "UTCEndOfDay";
}

export interface UtcStartOfDayScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["UTCStartOfDay"], any> {
  name: "UTCStartOfDay";
}

export type Resolvers<ContextType = Context> = {
  FloatRounded1?: GraphQLScalarType;
  FloatRounded2?: GraphQLScalarType;
  JSDate?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UTCDate?: GraphQLScalarType;
  UTCEndOfDay?: GraphQLScalarType;
  UTCStartOfDay?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
