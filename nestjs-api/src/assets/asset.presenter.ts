import { Asset } from './entities/asset.entity';

export class Assetpresenter {
  constructor(private asset: Asset) {}

  toJSON() {
    return {
      _id: this.asset._id,
      name: this.asset.name,
      symbol: this.asset.symbol,
      price: this.asset.price,
      image_url: `http://localhost:9000/${this.asset.image}`,
      createdAt: this.asset.createdAt,
      updatedAt: this.asset.updatedAt,
    };
  }
}
