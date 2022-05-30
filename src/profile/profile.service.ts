import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './follow.entity';
import { ProfileType } from './types/profile.type';
import { ProfileResponseInterface } from './types/profileResponse.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async getProfile(username: string, userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new HttpException('Profile doesnt exist', HttpStatus.NOT_FOUND);
    }

    const follow = await this.followRepository.findOne({
      followerId: userId,
      followingId: user.id,
    });

    return { ...user, following: Boolean(follow) };
  }

  async followProfile(username: string, userId: number): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new HttpException('Profile doesnt exist', HttpStatus.NOT_FOUND);
    }

    if (user.id === userId) {
      throw new HttpException(
        'You cant subcribe yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const follow = await this.followRepository.findOne({
      followerId: userId,
      followingId: user.id,
    });

    if (!follow) {
      const followToCreate = new FollowEntity();
      followToCreate.followerId = userId;
      followToCreate.followingId = user.id;
      await this.followRepository.save(followToCreate);
    }

    return { ...user, following: true };
  }

  async unfollowProfile(
    username: string,
    userId: number,
  ): Promise<ProfileType> {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new HttpException('Profile doesnt exist', HttpStatus.NOT_FOUND);
    }

    if (user.id === userId) {
      throw new HttpException(
        'You cant subcribe yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.followRepository.delete({
      followerId: userId,
      followingId: user.id,
    });

    return { ...user, following: false };
  }

  buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
    delete profile.email;
    return { profile };
  }
}
