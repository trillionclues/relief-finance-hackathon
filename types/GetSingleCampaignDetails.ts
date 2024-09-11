export interface GetSingleCampaignDetails {
  id: number;
  creator: string;
  title: string;
  description: string;
  physicalAddress: string;
  goal: number;
  deadline: Date;
  amountRaised: number;
  isCompleted: boolean;
  createdAt: Date;
  category: string;
}
