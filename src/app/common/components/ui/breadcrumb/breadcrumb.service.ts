import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { BreadcrumbItem } from './breadcrumb.component';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);

  public breadcrumbs = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.buildBreadcrumbs(this.router.routerState.snapshot.root)),
    ),
    { initialValue: [] as BreadcrumbItem[] },
  );

  private buildBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: BreadcrumbItem[] = [],
  ): BreadcrumbItem[] {
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb = child.data['breadcrumb'];
      if (
        breadcrumb &&
        (breadcrumbs.length === 0 ||
          breadcrumbs[breadcrumbs.length - 1].label !== breadcrumb)
      ) {
        breadcrumbs.push({
          label: breadcrumb,
          url: url,
        });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
