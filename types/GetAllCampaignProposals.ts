export interface GetAllCampaigns {
  amountRaised: number;
  category: string;
  createdAt: Date;
  creator: string;
  deadline: Date;
  description: string;
  goal: number;
  id: number;
  isApproved?: boolean;
  isCompleted: boolean;
  physicalAddress: string;
  title: string;
}
