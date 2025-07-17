import { Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile, UserProfileDocument } from 'src/schemas/user_profile.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserDetailsService {

  constructor(@InjectModel(UserProfile.name) private readonly userDetailModel: Model<UserProfileDocument>) { }

  async create(req: Request, createUserDetailDto: CreateUserDetailDto, file: Express.Multer.File): Promise<UserProfile> {
    const userId = (req as any).user?.id;

    const imageUrl = `/avatars/${file.filename}`


    const createdUserDetail = new this.userDetailModel({
      ...createUserDetailDto,
      imageUrl,
      userId,
    });

    return createdUserDetail.save();
  }

  findAll() {
    return `This action returns all userDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userDetail`;
  }

  update(id: number, updateUserDetailDto: UpdateUserDetailDto) {
    return `This action updates a #${id} userDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} userDetail`;
  }
}
