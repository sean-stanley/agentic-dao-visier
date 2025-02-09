// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { usePersistedOperations } from '@graphql-yoga/plugin-persisted-operations';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { DaolensSentinelTypes } from './sources/daolensSentinel/types';
import * as importedModule$0 from "./sources/daolensSentinel/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  Int8: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type MintingSuccess = {
  id: Scalars['Bytes']['output'];
  to: Scalars['Bytes']['output'];
  value: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type MintingSuccess_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to?: InputMaybe<Scalars['Bytes']['input']>;
  to_not?: InputMaybe<Scalars['Bytes']['input']>;
  to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  value?: InputMaybe<Scalars['BigInt']['input']>;
  value_not?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MintingSuccess_filter>>>;
  or?: InputMaybe<Array<InputMaybe<MintingSuccess_filter>>>;
};

export type MintingSuccess_orderBy =
  | 'id'
  | 'to'
  | 'value'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type ProposalAIUpdated = {
  id: Scalars['Bytes']['output'];
  proposal_id: Scalars['BigInt']['output'];
  ai_review_hash: Scalars['Bytes']['output'];
  score: Scalars['Int']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProposalAIUpdated_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposal_id?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ai_review_hash?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_not?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ai_review_hash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  ai_review_hash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  ai_review_hash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  score_not?: InputMaybe<Scalars['Int']['input']>;
  score_gt?: InputMaybe<Scalars['Int']['input']>;
  score_lt?: InputMaybe<Scalars['Int']['input']>;
  score_gte?: InputMaybe<Scalars['Int']['input']>;
  score_lte?: InputMaybe<Scalars['Int']['input']>;
  score_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  score_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalAIUpdated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalAIUpdated_filter>>>;
};

export type ProposalAIUpdated_orderBy =
  | 'id'
  | 'proposal_id'
  | 'ai_review_hash'
  | 'score'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ProposalApproved = {
  id: Scalars['Bytes']['output'];
  signer: Scalars['Bytes']['output'];
  proposal_id: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProposalApproved_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  signer?: InputMaybe<Scalars['Bytes']['input']>;
  signer_not?: InputMaybe<Scalars['Bytes']['input']>;
  signer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  signer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  signer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  signer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  signer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  signer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  signer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposal_id?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalApproved_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalApproved_filter>>>;
};

export type ProposalApproved_orderBy =
  | 'id'
  | 'signer'
  | 'proposal_id'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ProposalExecuted = {
  id: Scalars['Bytes']['output'];
  proposal_id: Scalars['BigInt']['output'];
  target: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProposalExecuted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposal_id?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  target?: InputMaybe<Scalars['Bytes']['input']>;
  target_not?: InputMaybe<Scalars['Bytes']['input']>;
  target_gt?: InputMaybe<Scalars['Bytes']['input']>;
  target_lt?: InputMaybe<Scalars['Bytes']['input']>;
  target_gte?: InputMaybe<Scalars['Bytes']['input']>;
  target_lte?: InputMaybe<Scalars['Bytes']['input']>;
  target_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  target_contains?: InputMaybe<Scalars['Bytes']['input']>;
  target_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalExecuted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalExecuted_filter>>>;
};

export type ProposalExecuted_orderBy =
  | 'id'
  | 'proposal_id'
  | 'target'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ProposalSubmitted = {
  id: Scalars['Bytes']['output'];
  proposer: Scalars['Bytes']['output'];
  proposal_id: Scalars['BigInt']['output'];
  descriptionHash: Scalars['Bytes']['output'];
  description: Scalars['String']['output'];
  vote_yes: Scalars['BigInt']['output'];
  vote_no: Scalars['BigInt']['output'];
  ai_risk_score: Scalars['Int']['output'];
  expiryTimestamp: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type ProposalSubmitted_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposal_id?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  descriptionHash?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  descriptionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  descriptionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vote_yes?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_not?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_yes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vote_yes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vote_no?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_not?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_gt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_lt?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_gte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_lte?: InputMaybe<Scalars['BigInt']['input']>;
  vote_no_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vote_no_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ai_risk_score?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_not?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_gt?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_lt?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_gte?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_lte?: InputMaybe<Scalars['Int']['input']>;
  ai_risk_score_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  ai_risk_score_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  expiryTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiryTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiryTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalSubmitted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ProposalSubmitted_filter>>>;
};

export type ProposalSubmitted_orderBy =
  | 'id'
  | 'proposer'
  | 'proposal_id'
  | 'descriptionHash'
  | 'description'
  | 'vote_yes'
  | 'vote_no'
  | 'ai_risk_score'
  | 'expiryTimestamp'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  tokensStaked?: Maybe<TokensStaked>;
  tokensStakeds: Array<TokensStaked>;
  proposalSubmitted?: Maybe<ProposalSubmitted>;
  proposalSubmitteds: Array<ProposalSubmitted>;
  voteCast?: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  signerAdded?: Maybe<SignerAdded>;
  signerAddeds: Array<SignerAdded>;
  proposalApproved?: Maybe<ProposalApproved>;
  proposalApproveds: Array<ProposalApproved>;
  proposalExecuted?: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  mintingSuccess?: Maybe<MintingSuccess>;
  mintingSuccesses: Array<MintingSuccess>;
  proposalAIUpdated?: Maybe<ProposalAIUpdated>;
  proposalAIUpdateds: Array<ProposalAIUpdated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QuerytokensStakedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensStakedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensStaked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensStaked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalSubmittedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalSubmittedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalSubmitted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalSubmitted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteCastArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteCastsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VoteCast_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteCast_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignerAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysignerAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SignerAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SignerAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalApprovedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalApprovedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalApproved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalApproved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalExecutedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalExecutedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalExecuted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalExecuted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintingSuccessArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintingSuccessesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintingSuccess_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintingSuccess_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalAIUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryproposalAIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalAIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalAIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SignerAdded = {
  id: Scalars['Bytes']['output'];
  signer: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type SignerAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  signer?: InputMaybe<Scalars['Bytes']['input']>;
  signer_not?: InputMaybe<Scalars['Bytes']['input']>;
  signer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  signer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  signer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  signer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  signer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  signer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  signer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  signer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SignerAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SignerAdded_filter>>>;
};

export type SignerAdded_orderBy =
  | 'id'
  | 'signer'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  tokensStaked?: Maybe<TokensStaked>;
  tokensStakeds: Array<TokensStaked>;
  proposalSubmitted?: Maybe<ProposalSubmitted>;
  proposalSubmitteds: Array<ProposalSubmitted>;
  voteCast?: Maybe<VoteCast>;
  voteCasts: Array<VoteCast>;
  signerAdded?: Maybe<SignerAdded>;
  signerAddeds: Array<SignerAdded>;
  proposalApproved?: Maybe<ProposalApproved>;
  proposalApproveds: Array<ProposalApproved>;
  proposalExecuted?: Maybe<ProposalExecuted>;
  proposalExecuteds: Array<ProposalExecuted>;
  mintingSuccess?: Maybe<MintingSuccess>;
  mintingSuccesses: Array<MintingSuccess>;
  proposalAIUpdated?: Maybe<ProposalAIUpdated>;
  proposalAIUpdateds: Array<ProposalAIUpdated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptiontokensStakedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensStakedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TokensStaked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokensStaked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalSubmittedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalSubmittedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalSubmitted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalSubmitted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteCastArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteCastsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VoteCast_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteCast_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignerAddedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsignerAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SignerAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SignerAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalApprovedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalApprovedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalApproved_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalApproved_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalExecutedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalExecutedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalExecuted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalExecuted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintingSuccessArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintingSuccessesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MintingSuccess_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintingSuccess_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalAIUpdatedArgs = {
  id: Scalars['ID']['input'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionproposalAIUpdatedsArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalAIUpdated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ProposalAIUpdated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokensStaked = {
  id: Scalars['Bytes']['output'];
  sender: Scalars['Bytes']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TokensStaked_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TokensStaked_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokensStaked_filter>>>;
};

export type TokensStaked_orderBy =
  | 'id'
  | 'sender'
  | 'amount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VoteCast = {
  id: Scalars['Bytes']['output'];
  voter: Scalars['Bytes']['output'];
  proposal_id: Scalars['BigInt']['output'];
  approve: Scalars['Boolean']['output'];
  power: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type VoteCast_filter = {
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  voter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  voter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposal_id?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposal_id_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposal_id_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  approve?: InputMaybe<Scalars['Boolean']['input']>;
  approve_not?: InputMaybe<Scalars['Boolean']['input']>;
  approve_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  approve_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  power?: InputMaybe<Scalars['BigInt']['input']>;
  power_not?: InputMaybe<Scalars['BigInt']['input']>;
  power_gt?: InputMaybe<Scalars['BigInt']['input']>;
  power_lt?: InputMaybe<Scalars['BigInt']['input']>;
  power_gte?: InputMaybe<Scalars['BigInt']['input']>;
  power_lte?: InputMaybe<Scalars['BigInt']['input']>;
  power_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  power_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VoteCast_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VoteCast_filter>>>;
};

export type VoteCast_orderBy =
  | 'id'
  | 'voter'
  | 'proposal_id'
  | 'approve'
  | 'power'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
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
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']['output']>;
  MintingSuccess: ResolverTypeWrapper<MintingSuccess>;
  MintingSuccess_filter: MintingSuccess_filter;
  MintingSuccess_orderBy: MintingSuccess_orderBy;
  OrderDirection: OrderDirection;
  ProposalAIUpdated: ResolverTypeWrapper<ProposalAIUpdated>;
  ProposalAIUpdated_filter: ProposalAIUpdated_filter;
  ProposalAIUpdated_orderBy: ProposalAIUpdated_orderBy;
  ProposalApproved: ResolverTypeWrapper<ProposalApproved>;
  ProposalApproved_filter: ProposalApproved_filter;
  ProposalApproved_orderBy: ProposalApproved_orderBy;
  ProposalExecuted: ResolverTypeWrapper<ProposalExecuted>;
  ProposalExecuted_filter: ProposalExecuted_filter;
  ProposalExecuted_orderBy: ProposalExecuted_orderBy;
  ProposalSubmitted: ResolverTypeWrapper<ProposalSubmitted>;
  ProposalSubmitted_filter: ProposalSubmitted_filter;
  ProposalSubmitted_orderBy: ProposalSubmitted_orderBy;
  Query: ResolverTypeWrapper<{}>;
  SignerAdded: ResolverTypeWrapper<SignerAdded>;
  SignerAdded_filter: SignerAdded_filter;
  SignerAdded_orderBy: SignerAdded_orderBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  TokensStaked: ResolverTypeWrapper<TokensStaked>;
  TokensStaked_filter: TokensStaked_filter;
  TokensStaked_orderBy: TokensStaked_orderBy;
  VoteCast: ResolverTypeWrapper<VoteCast>;
  VoteCast_filter: VoteCast_filter;
  VoteCast_orderBy: VoteCast_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal']['output'];
  BigInt: Scalars['BigInt']['output'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean']['output'];
  Bytes: Scalars['Bytes']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Int8: Scalars['Int8']['output'];
  MintingSuccess: MintingSuccess;
  MintingSuccess_filter: MintingSuccess_filter;
  ProposalAIUpdated: ProposalAIUpdated;
  ProposalAIUpdated_filter: ProposalAIUpdated_filter;
  ProposalApproved: ProposalApproved;
  ProposalApproved_filter: ProposalApproved_filter;
  ProposalExecuted: ProposalExecuted;
  ProposalExecuted_filter: ProposalExecuted_filter;
  ProposalSubmitted: ProposalSubmitted;
  ProposalSubmitted_filter: ProposalSubmitted_filter;
  Query: {};
  SignerAdded: SignerAdded;
  SignerAdded_filter: SignerAdded_filter;
  String: Scalars['String']['output'];
  Subscription: {};
  Timestamp: Scalars['Timestamp']['output'];
  TokensStaked: TokensStaked;
  TokensStaked_filter: TokensStaked_filter;
  VoteCast: VoteCast;
  VoteCast_filter: VoteCast_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String']['input'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String']['input'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type MintingSuccessResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MintingSuccess'] = ResolversParentTypes['MintingSuccess']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalAIUpdatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProposalAIUpdated'] = ResolversParentTypes['ProposalAIUpdated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ai_review_hash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalApprovedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProposalApproved'] = ResolversParentTypes['ProposalApproved']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalExecutedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProposalExecuted'] = ResolversParentTypes['ProposalExecuted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProposalSubmittedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ProposalSubmitted'] = ResolversParentTypes['ProposalSubmitted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  descriptionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vote_yes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  vote_no?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ai_risk_score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  expiryTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  tokensStaked?: Resolver<Maybe<ResolversTypes['TokensStaked']>, ParentType, ContextType, RequireFields<QuerytokensStakedArgs, 'id' | 'subgraphError'>>;
  tokensStakeds?: Resolver<Array<ResolversTypes['TokensStaked']>, ParentType, ContextType, RequireFields<QuerytokensStakedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalSubmitted?: Resolver<Maybe<ResolversTypes['ProposalSubmitted']>, ParentType, ContextType, RequireFields<QueryproposalSubmittedArgs, 'id' | 'subgraphError'>>;
  proposalSubmitteds?: Resolver<Array<ResolversTypes['ProposalSubmitted']>, ParentType, ContextType, RequireFields<QueryproposalSubmittedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteCast?: Resolver<Maybe<ResolversTypes['VoteCast']>, ParentType, ContextType, RequireFields<QueryvoteCastArgs, 'id' | 'subgraphError'>>;
  voteCasts?: Resolver<Array<ResolversTypes['VoteCast']>, ParentType, ContextType, RequireFields<QueryvoteCastsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signerAdded?: Resolver<Maybe<ResolversTypes['SignerAdded']>, ParentType, ContextType, RequireFields<QuerysignerAddedArgs, 'id' | 'subgraphError'>>;
  signerAddeds?: Resolver<Array<ResolversTypes['SignerAdded']>, ParentType, ContextType, RequireFields<QuerysignerAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalApproved?: Resolver<Maybe<ResolversTypes['ProposalApproved']>, ParentType, ContextType, RequireFields<QueryproposalApprovedArgs, 'id' | 'subgraphError'>>;
  proposalApproveds?: Resolver<Array<ResolversTypes['ProposalApproved']>, ParentType, ContextType, RequireFields<QueryproposalApprovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalExecuted?: Resolver<Maybe<ResolversTypes['ProposalExecuted']>, ParentType, ContextType, RequireFields<QueryproposalExecutedArgs, 'id' | 'subgraphError'>>;
  proposalExecuteds?: Resolver<Array<ResolversTypes['ProposalExecuted']>, ParentType, ContextType, RequireFields<QueryproposalExecutedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mintingSuccess?: Resolver<Maybe<ResolversTypes['MintingSuccess']>, ParentType, ContextType, RequireFields<QuerymintingSuccessArgs, 'id' | 'subgraphError'>>;
  mintingSuccesses?: Resolver<Array<ResolversTypes['MintingSuccess']>, ParentType, ContextType, RequireFields<QuerymintingSuccessesArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalAIUpdated?: Resolver<Maybe<ResolversTypes['ProposalAIUpdated']>, ParentType, ContextType, RequireFields<QueryproposalAIUpdatedArgs, 'id' | 'subgraphError'>>;
  proposalAIUpdateds?: Resolver<Array<ResolversTypes['ProposalAIUpdated']>, ParentType, ContextType, RequireFields<QueryproposalAIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SignerAddedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SignerAdded'] = ResolversParentTypes['SignerAdded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  signer?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  tokensStaked?: SubscriptionResolver<Maybe<ResolversTypes['TokensStaked']>, "tokensStaked", ParentType, ContextType, RequireFields<SubscriptiontokensStakedArgs, 'id' | 'subgraphError'>>;
  tokensStakeds?: SubscriptionResolver<Array<ResolversTypes['TokensStaked']>, "tokensStakeds", ParentType, ContextType, RequireFields<SubscriptiontokensStakedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalSubmitted?: SubscriptionResolver<Maybe<ResolversTypes['ProposalSubmitted']>, "proposalSubmitted", ParentType, ContextType, RequireFields<SubscriptionproposalSubmittedArgs, 'id' | 'subgraphError'>>;
  proposalSubmitteds?: SubscriptionResolver<Array<ResolversTypes['ProposalSubmitted']>, "proposalSubmitteds", ParentType, ContextType, RequireFields<SubscriptionproposalSubmittedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteCast?: SubscriptionResolver<Maybe<ResolversTypes['VoteCast']>, "voteCast", ParentType, ContextType, RequireFields<SubscriptionvoteCastArgs, 'id' | 'subgraphError'>>;
  voteCasts?: SubscriptionResolver<Array<ResolversTypes['VoteCast']>, "voteCasts", ParentType, ContextType, RequireFields<SubscriptionvoteCastsArgs, 'skip' | 'first' | 'subgraphError'>>;
  signerAdded?: SubscriptionResolver<Maybe<ResolversTypes['SignerAdded']>, "signerAdded", ParentType, ContextType, RequireFields<SubscriptionsignerAddedArgs, 'id' | 'subgraphError'>>;
  signerAddeds?: SubscriptionResolver<Array<ResolversTypes['SignerAdded']>, "signerAddeds", ParentType, ContextType, RequireFields<SubscriptionsignerAddedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalApproved?: SubscriptionResolver<Maybe<ResolversTypes['ProposalApproved']>, "proposalApproved", ParentType, ContextType, RequireFields<SubscriptionproposalApprovedArgs, 'id' | 'subgraphError'>>;
  proposalApproveds?: SubscriptionResolver<Array<ResolversTypes['ProposalApproved']>, "proposalApproveds", ParentType, ContextType, RequireFields<SubscriptionproposalApprovedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalExecuted?: SubscriptionResolver<Maybe<ResolversTypes['ProposalExecuted']>, "proposalExecuted", ParentType, ContextType, RequireFields<SubscriptionproposalExecutedArgs, 'id' | 'subgraphError'>>;
  proposalExecuteds?: SubscriptionResolver<Array<ResolversTypes['ProposalExecuted']>, "proposalExecuteds", ParentType, ContextType, RequireFields<SubscriptionproposalExecutedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mintingSuccess?: SubscriptionResolver<Maybe<ResolversTypes['MintingSuccess']>, "mintingSuccess", ParentType, ContextType, RequireFields<SubscriptionmintingSuccessArgs, 'id' | 'subgraphError'>>;
  mintingSuccesses?: SubscriptionResolver<Array<ResolversTypes['MintingSuccess']>, "mintingSuccesses", ParentType, ContextType, RequireFields<SubscriptionmintingSuccessesArgs, 'skip' | 'first' | 'subgraphError'>>;
  proposalAIUpdated?: SubscriptionResolver<Maybe<ResolversTypes['ProposalAIUpdated']>, "proposalAIUpdated", ParentType, ContextType, RequireFields<SubscriptionproposalAIUpdatedArgs, 'id' | 'subgraphError'>>;
  proposalAIUpdateds?: SubscriptionResolver<Array<ResolversTypes['ProposalAIUpdated']>, "proposalAIUpdateds", ParentType, ContextType, RequireFields<SubscriptionproposalAIUpdatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type TokensStakedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokensStaked'] = ResolversParentTypes['TokensStaked']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteCastResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VoteCast'] = ResolversParentTypes['VoteCast']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposal_id?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  approve?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  power?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  MintingSuccess?: MintingSuccessResolvers<ContextType>;
  ProposalAIUpdated?: ProposalAIUpdatedResolvers<ContextType>;
  ProposalApproved?: ProposalApprovedResolvers<ContextType>;
  ProposalExecuted?: ProposalExecutedResolvers<ContextType>;
  ProposalSubmitted?: ProposalSubmittedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignerAdded?: SignerAddedResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  TokensStaked?: TokensStakedResolvers<ContextType>;
  VoteCast?: VoteCastResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = DaolensSentinelTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/daolensSentinel/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const daolensSentinelTransforms = [];
const additionalTypeDefs = [] as any[];
const daolensSentinelHandler = new GraphqlHandler({
              name: "daolensSentinel",
              config: {"endpoint":"https://api.studio.thegraph.com/query/102988/daolens/version/latest"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("daolensSentinel"),
              logger: logger.child("daolensSentinel"),
              importFn,
            });
sources[0] = {
          name: 'daolensSentinel',
          handler: daolensSentinelHandler,
          transforms: daolensSentinelTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })
const documentHashMap = {
        "1fe51bf2728cdf46b61f33eac79a9bc8eeaad09929df5a882b3bcea6bb12a9f6": ExampleQueryDocument,
"1fe51bf2728cdf46b61f33eac79a9bc8eeaad09929df5a882b3bcea6bb12a9f6": LastProposalIdDocument
      }
additionalEnvelopPlugins.push(usePersistedOperations({
        getPersistedOperation(key) {
          return documentHashMap[key];
        },
        ...{}
      }))

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: ExampleQueryDocument,
        get rawSDL() {
          return printWithCache(ExampleQueryDocument);
        },
        location: 'ExampleQueryDocument.graphql',
        sha256Hash: '1fe51bf2728cdf46b61f33eac79a9bc8eeaad09929df5a882b3bcea6bb12a9f6'
      },{
        document: LastProposalIdDocument,
        get rawSDL() {
          return printWithCache(LastProposalIdDocument);
        },
        location: 'LastProposalIdDocument.graphql',
        sha256Hash: '1fe51bf2728cdf46b61f33eac79a9bc8eeaad09929df5a882b3bcea6bb12a9f6'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type ExampleQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type ExampleQueryQuery = { proposalSubmitteds: Array<Pick<ProposalSubmitted, 'description' | 'descriptionHash' | 'expiryTimestamp' | 'id' | 'proposal_id' | 'proposer'>> };

export type LastProposalIdQueryVariables = Exact<{ [key: string]: never; }>;


export type LastProposalIdQuery = { proposalSubmitteds: Array<Pick<ProposalSubmitted, 'proposal_id'>> };


export const ExampleQueryDocument = gql`
    query ExampleQuery {
  proposalSubmitteds(first: 10) {
    description
    descriptionHash
    expiryTimestamp
    id
    proposal_id
    proposer
  }
}
    ` as unknown as DocumentNode<ExampleQueryQuery, ExampleQueryQueryVariables>;
export const LastProposalIdDocument = gql`
    query LastProposalId {
  proposalSubmitteds(first: 1, orderDirection: desc, orderBy: proposal_id) {
    proposal_id
  }
}
    ` as unknown as DocumentNode<LastProposalIdQuery, LastProposalIdQueryVariables>;



export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    ExampleQuery(variables?: ExampleQueryQueryVariables, options?: C): Promise<ExampleQueryQuery> {
      return requester<ExampleQueryQuery, ExampleQueryQueryVariables>(ExampleQueryDocument, variables, options) as Promise<ExampleQueryQuery>;
    },
    LastProposalId(variables?: LastProposalIdQueryVariables, options?: C): Promise<LastProposalIdQuery> {
      return requester<LastProposalIdQuery, LastProposalIdQueryVariables>(LastProposalIdDocument, variables, options) as Promise<LastProposalIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;