/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  TodoItem: { // root type
    cost?: number | null; // Float
    description?: string | null; // String
    id: string; // String!
    isCompleted: boolean; // Boolean!
    title: string; // String!
    todoListId: string; // String!
  }
  TodoList: { // root type
    id: string; // String!
    isLocked: boolean; // Boolean!
    title?: string | null; // String
    workspaceId: string; // String!
  }
  User: { // root type
    id?: string | null; // String
  }
  Workspace: { // root type
    id: string; // String!
    isShared: boolean; // Boolean!
    ownerId: string; // String!
    title: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
    createUser: NexusGenRootTypes['User'] | null; // User
    createWorkspace: NexusGenRootTypes['Workspace'] | null; // Workspace
    deleteTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
    deleteWorkspace: NexusGenRootTypes['Workspace'] | null; // Workspace
    updateTodoList: NexusGenRootTypes['TodoList'] | null; // TodoList
  }
  Query: { // field return type
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  TodoItem: { // field return type
    cost: number | null; // Float
    description: string | null; // String
    id: string; // String!
    isCompleted: boolean; // Boolean!
    title: string; // String!
    todoListId: string; // String!
  }
  TodoList: { // field return type
    id: string; // String!
    isLocked: boolean; // Boolean!
    title: string | null; // String
    todoItems: Array<NexusGenRootTypes['TodoItem'] | null>; // [TodoItem]!
    workspaceId: string; // String!
  }
  User: { // field return type
    id: string | null; // String
  }
  Workspace: { // field return type
    id: string; // String!
    isShared: boolean; // Boolean!
    ownerId: string; // String!
    title: string; // String!
    todoLists: Array<NexusGenRootTypes['TodoList'] | null>; // [TodoList]!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createTodoList: 'TodoList'
    createUser: 'User'
    createWorkspace: 'Workspace'
    deleteTodoList: 'TodoList'
    deleteWorkspace: 'Workspace'
    updateTodoList: 'TodoList'
  }
  Query: { // field return type name
    user: 'User'
    users: 'User'
  }
  TodoItem: { // field return type name
    cost: 'Float'
    description: 'String'
    id: 'String'
    isCompleted: 'Boolean'
    title: 'String'
    todoListId: 'String'
  }
  TodoList: { // field return type name
    id: 'String'
    isLocked: 'Boolean'
    title: 'String'
    todoItems: 'TodoItem'
    workspaceId: 'String'
  }
  User: { // field return type name
    id: 'String'
  }
  Workspace: { // field return type name
    id: 'String'
    isShared: 'Boolean'
    ownerId: 'String'
    title: 'String'
    todoLists: 'TodoList'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTodoList: { // args
      title?: string | null; // String
      workspaceId: string; // String!
    }
    createWorkspace: { // args
      title: string; // String!
    }
    deleteTodoList: { // args
      id: string; // String!
    }
    deleteWorkspace: { // args
      id: string; // String!
    }
    updateTodoList: { // args
      id: string; // String!
      isLocked?: boolean | null; // Boolean
      title?: string | null; // String
    }
  }
  Query: {
    user: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}