import { NgModule } from '@angular/core';
import { FroalaEditorDirective } from './editor.directive';
export class FroalaEditorModule {
    static forRoot() {
        return { ngModule: FroalaEditorModule, providers: [] };
    }
}
FroalaEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [FroalaEditorDirective],
                exports: [FroalaEditorDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Byb2plY3RzL2xpYnJhcnkvc3JjL2VkaXRvci9lZGl0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTzNELE1BQU0sT0FBTyxrQkFBa0I7SUFDdEIsTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFDLENBQUM7SUFDdkQsQ0FBQzs7O1lBUkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNqQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBGcm9hbGFFZGl0b3JEaXJlY3RpdmUgfSBmcm9tICcuL2VkaXRvci5kaXJlY3RpdmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtGcm9hbGFFZGl0b3JEaXJlY3RpdmVdLFxyXG4gIGV4cG9ydHM6IFtGcm9hbGFFZGl0b3JEaXJlY3RpdmVdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRnJvYWxhRWRpdG9yTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxGcm9hbGFFZGl0b3JNb2R1bGU+IHtcclxuICAgIHJldHVybiB7bmdNb2R1bGU6IEZyb2FsYUVkaXRvck1vZHVsZSwgcHJvdmlkZXJzOiBbXX07XHJcbiAgfVxyXG59XHJcbiJdfQ==