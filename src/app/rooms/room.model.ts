export class Room {
  roomNo!: string;
  roomType!: string;
  occupied!: boolean;
  occupiedUntil?:Date;
  dirty!: boolean;
  desc?: string;
  image?: string[];
  beds!: number;
}

export class PricingPeriod{
  periodId!:string;
  periodStart!:Date;
  periodEnd!:Date;
  price!:number;
}
