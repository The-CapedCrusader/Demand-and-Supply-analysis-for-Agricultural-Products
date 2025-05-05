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