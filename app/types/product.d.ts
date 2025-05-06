export type Product = {
	Quantity: number;
	ProductID: number;
	ProductID?: number,
	VarietyName: string;
	ProductName: string;
	CategoryName: string;
	ShelfLifeDays: number;
	SeasonalityName: string;
}

export type ProductCategory = {
	CategoryID: number;
	CategoryName: string;
}

export type ProductVariety = {
	VarietyID: number;
	CategoryID: number;
	VarietyName: string;
}

export type ProductSeasonality = {
	SeasonalityID: number;
	SeasonalityName: string;
}

export type ProductRequestBody = {
	Quantity: number,
	VarietyID: number,
	CategoryID: number,
	ProductID?: number,
	ProductName: string,
	SeasonalityID: number,
	ShelfLifeDays: number
}

export type ProductuctionHistory = {
	HistoryID: number;
	ProductID: number;
	VarietyName: string;
	ProductName: string;
	CategoryName: string;
	SeasonalityName: string;
	Quantity: number;
	Acreage: number;
	Yield: number;
	CostPerAcre: number;
	PricePerTon: number;
	Year: number;
}

export type ProductuctionHistoryData = {
	ProductID: number;
	VarietyName: string;
	ProductName: string;
	CategoryName: string;
	SeasonalityName: string;
    ProductionData: {
		Year: number;
        Yield: number;
        Acreage: number;
		HistoryID: number;
        CostPerAcre: number;
        PricePerTon: number;
    }[];
}

export type SeasonalProductionHistory = {
	Season: string;
	Volume: number;
}