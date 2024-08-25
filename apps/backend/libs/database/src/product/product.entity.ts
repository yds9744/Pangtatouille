import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('int')
  discountRate: number | null;

  @Column('int')
  basePrice: number | null;

  @Column('int', { nullable: false })
  price: number;

  @Column('varchar', { length: 20, nullable: false })
  category: string;

  @Column('int', { nullable: false })
  amount: number;

  @Column('varchar', { length: 10, nullable: false })
  amountUnit: string;

  @Column('int', { nullable: false })
  quantity: number;

  @Column('varchar', { length: 10, nullable: false })
  quantityUnit: string;

  @Column('varchar', { length: 50 })
  unitPriceText: string | null;

  @Column('varchar', { length: 100 })
  arrivalInfo: string | null;

  @Column('int')
  ratingTotalCnt: number | null;

  @Column('int')
  rewardCash: number | null;

  @Column('text', { nullable: true })
  imageUrl: string;

  static async searchBy({ name }: { name: string }) {
    const searchedResult = await this.createQueryBuilder('product')
      .where(`to_tsvector('english', category) @@ plainto_tsquery(:name)`, {
        name,
      })
      .getMany();
    if (
      searchedResult.length > 0 &&
      searchedResult[0].category !== '설탕 소금 고춧가루'
    ) {
      return searchedResult;
    }

    return this.createQueryBuilder('product')
      .where(`to_tsvector('english', name) @@ plainto_tsquery(:name)`, {
        name,
      })
      .getMany();
  }
}
