import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./shaared/auth-interceptor.service";
import { AuthGuard } from "./shaared/auth.guard";
import { AuthService } from "./shaared/services/auth.service";
import { DataStorageService } from "./shaared/services/data-storage.service";
import { RecipeService } from "./shaared/services/recipe.service";
import { RecipeResolverService } from "./shaared/services/recipes-resolver.service";
import { ShoppingListService } from "./shaared/services/shopping-list.service";


@NgModule({
    providers: [
        RecipeService,
        ShoppingListService,
        DataStorageService,
        RecipeResolverService,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
        AuthGuard
      ],
})
export class CoreModule {}
