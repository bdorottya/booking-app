export class Room {
  roomNo!: string;
  roomTypeId!: string;
  occupied!: boolean;
  dirty!: boolean;
}

export class RoomType {
  beds!: number;
  roomType!: string;
  price!: string;
  image!: string[];
  desc!: string;
}
