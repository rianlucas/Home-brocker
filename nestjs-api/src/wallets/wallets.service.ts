import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import mongoose, { Model } from 'mongoose';
import { WalletAsset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
    @InjectConnection()
    private connection: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find();
  }

  findOne(id: string) {
    this.walletAssetSchema
      .findOne({ wallet: id })
      .populate(['asset', 'wallet']);
    return this.walletSchema.findById(id);
  }

  async createWalletasset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const session = await this.connection.startSession();
    await session.startTransaction();

    try {
      const docs = await this.walletAssetSchema.create(
        {
          wallet: data.walletId,
          asset: data.assetId,
          shares: data.shares,
        },
        { session },
      );

      const walletAsset = docs[0];
      await this.walletAssetSchema.updateOne(
        { _id: data.walletId },
        {
          $push: { assets: walletAsset._id },
        },
        { session },
      );

      await session.commitTransaction();
      return walletAsset;
    } catch (error) {
      console.error(error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
