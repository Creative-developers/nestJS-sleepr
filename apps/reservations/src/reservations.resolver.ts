import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { ReservationDocument } from './models/reservation.model';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { currentUser, UserDto } from '@app/common';

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  createReservations(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @currentUser() user: UserDto,
  ) {
    return this.reservationsService.create(createReservationInput, user);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => ReservationDocument)
  removeReservation(@Args('id', { type: () => String }) id: string) {
    return this.reservationsService.remove(id);
  }
}
