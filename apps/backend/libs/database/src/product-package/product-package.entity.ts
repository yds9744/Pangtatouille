import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from 'types/ingredient';
import { Product } from 'types/product';

@Entity('product_package')
export class ProductPackage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  ingredients: Ingredient[];

  @Column('json')
  recipe: any;

  @Column('json')
  products: Product[];

  @Column('json')
  video: any;
}
