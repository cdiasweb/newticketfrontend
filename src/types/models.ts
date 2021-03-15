// PRODUCT CATEGORY
type category = {
    idproduct_category: number,
    name: string,
    description: string,
    status: string
};

// COMPANY
type company = {
    id?: number,
    name: string,
    address: string,
    field: string,
    companyImages?: Array<companyImage>
};

// CUSTOMER
type customer = {
    id?: number,
    name: string,
    company_id?: number,
};

// PRODUCT IMAGE
type companyImage = {
    idimage?: number,
    image: string
}

// IMAGE UPLOAD PREVIEW
type imageUploadPreview = {
    imagePreview: companyImage,
    key?: string
} 

// user
type user = {
    id?: number,
    name: string,
    email: string,
    password: string,
    type: number,
}

export { category, company, companyImage, imageUploadPreview, user, customer }