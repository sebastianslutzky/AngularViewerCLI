export class IdentityMap {
  index(: any): any {
  }

    // when receiving results, pass it to this registy
    // it will extract hte "self" rel and upsert to this registry
    // later it will need to ensure existing views are refreshed when updating (not inserting) 
    // probably via notification (make this observable?)
}
