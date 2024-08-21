export interface ProposalItemTypes {
  id: number;
  title: string;
  date: string;
  description: string;
  paraText: string;
  image: string;
  donationsCount: number;
  currentAmount: number;
  totalAmount: number;
  category: string;
  supports: Support[];
}

interface Support {
  id: number;
  name: string;
  amount: number;
  address: string;
  timeAgo: string;
  message: string;
  avatar: string;
}
