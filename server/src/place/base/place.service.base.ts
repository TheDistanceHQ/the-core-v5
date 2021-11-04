import { PrismaService } from "nestjs-prisma";
import { Prisma, Place } from "@prisma/client";

export class PlaceServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PlaceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceFindManyArgs>
  ): Promise<number> {
    return this.prisma.place.count(args);
  }

  async findMany<T extends Prisma.PlaceFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceFindManyArgs>
  ): Promise<Place[]> {
    return this.prisma.place.findMany(args);
  }
  async findOne<T extends Prisma.PlaceFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceFindUniqueArgs>
  ): Promise<Place | null> {
    return this.prisma.place.findUnique(args);
  }
  async create<T extends Prisma.PlaceCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceCreateArgs>
  ): Promise<Place> {
    return this.prisma.place.create<T>(args);
  }
  async update<T extends Prisma.PlaceUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceUpdateArgs>
  ): Promise<Place> {
    return this.prisma.place.update<T>(args);
  }
  async delete<T extends Prisma.PlaceDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PlaceDeleteArgs>
  ): Promise<Place> {
    return this.prisma.place.delete(args);
  }
}
