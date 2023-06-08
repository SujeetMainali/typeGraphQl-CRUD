import userService from "../service/user.service";
import { UserSchema } from "../schema/user.schema";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {  UserInput } from "../validator/user.validator";
import userAccountdetailService from "../service/userAccountdetail.service";


@Resolver()
export class UserResolver {
  // constructor(private readonly userService: userService) {}
  @Mutation(() => UserSchema)
  async createUser(@Arg("data") data: UserInput) {
    let userAccountDetails;
    if (data.userAccountDetails) {
      userAccountDetails = await Promise.all(
        data.userAccountDetails.map(async (details) => {
          return await userAccountdetailService.createUserAccountDetails(
            details
          );
        })
      );
      const user = await userService.createUser(data, userAccountDetails);
      return user;
    }
  }

  @Query(() => [UserSchema])
  async users() {
    return await userService.get();
  }

  @Query(() => [UserSchema])
  async getUserById(@Arg("id") id: string) {
    const user =  await userService.getById(id);
    return [user]
  }

  @Mutation(()=>UserSchema)
  async updateUserById(
    @Arg("id")id: string,
    @Arg('data')data: UserInput
  ){
    const user = await userService.updateUserById(id, data)
    return user
  }
}
