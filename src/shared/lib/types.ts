import { PropsWithChildren, ComponentPropsWithoutRef, ElementType } from 'react';

export type WithClassName<T extends ElementType> = PropsWithChildren<ComponentPropsWithoutRef<T>> & {
  className?: string;
};
