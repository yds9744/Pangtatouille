import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int')
  discountRate: number;

  @Column('int')
  basePrice: number;

  @Column('int')
  price: number;

  @Column('int')
  quantity: number;

  @Column('varchar', { length: 10 })
  unit: string;

  @Column('varchar', { length: 50 })
  unitPriceText: string;

  @Column('varchar', { length: 100 })
  arrivalInfo: string;

  @Column('int')
  ratingTotalCnt: number;

  @Column('int')
  rewardCash: number;

  @Column('text')
  imageUrl: string;

  static async searchBy({ name }: { name: string }) {
    return this.createQueryBuilder('product')
      .where('product.name LIKE :name', {
        name: `%${name}%`,
      })
      .getMany();
  }
}
