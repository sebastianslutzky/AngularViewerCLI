import { Injectable, ViewContainerRef, ComponentRef, ComponentFactoryResolver, ReflectiveInjector } from '@angular/core';

@Injectable()
export class ComponentFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public createComponent (vCref: ViewContainerRef, type: any, inputData: any = []): ComponentRef<any> {
    const inputProviders = Object.keys(inputData).map((inputName) => {
      return {
        provide: inputName, useValue: inputData[inputName]}; });
        const factory = this.componentFactoryResolver.resolveComponentFactory(type);

        const  resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        // vCref is needed cause of that injector..
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, vCref.parentInjector);

        // create component without adding it directly to the DOM
        const comp = factory.create(injector);

        return comp;
      }

}
