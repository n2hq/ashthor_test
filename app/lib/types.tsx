import { ReactNode } from "react"

export type NavProps = {
    openNav: () => void
    navBg: boolean
}

export type NavTheme = {
    theme: string
}

export type CenterNavProps = {
    navBg: boolean
}

export type MobileNavProps = {
    showNav: boolean
    closeNav: () => void
}

export interface IAddUser {
    email: string
    first_name: string
    password: string
    lastname: string
}

export interface IUser {
    guid: string
    email: string
    first_name: string
    lastname: string
    user_hash: string
    user_guid: string
    active: boolean
    deleted: boolean
}



export type EditUserType = {
    email: string
    first_name: string
    lastname: string
    img: string
    country_code: string
    state_code: string
    city_id: string
    zipcode: string
    phone: string
    address_one: string
    address_two: string
    active: boolean
    deleted: boolean
}

export type LoginType = {
    email: string
    password: string
}


export type DeleteType = {
    user_guid: string
    password: string
    confirm_delete: string
    business_guid: string
}

export type AuthUser = {
    guid: string
    email: string
    first_name: string
    last_name: string
    iat: string
    exp: string
    role: string
}

export type AuthContextType = {
    user: AuthUser
    signin: (data: LoginType) => Promise<any>
    signoutNoReload: () => void
    signoutReload: () => void
    resetpw: (data: any) => any
};

export type AuthTokens = {
    accessToken: string
    refreshToken: string
}

export type TokenType = {
    token: string
}

export type ResetPasswordType = {
    email: string
    owner: string
}

export type NavProp = {
    openNav: () => void
}

export type ListingType = {
    url: string
    title: string
    branch: boolean
    branch_location: string
    category: string
    short_description: string
    long_description: string
    phone: string
    email_address: string
    address_one: string
    address_two: string
    gid: string
    img: string
    listing_hash: string
    owner: string
    username: string
    pagetype: string
    zipcode: string
    products: string
    services: string
    business_phrases: string
    established: string
    xsocial: string
    linksocial: string
    fbsocial: string
    country_code: string
    country_name: string
    state_code: string
    state_name: string
    city_id: string
    website: string
    image_url: string
    bg_image_url: string
    social_media: string
    average_rating: string
    facility_features: string
    total_reviews: string
    latitude: string
    longitude: string
    city_name: string
    first_name: string
    last_name: string
    rating_average: any
    rating_count: any
    minimum_amount: any
    minimum_amount_currency_code: any
    avg_rating: any
    count_of_rating: any
    currency: any
    profile_image_url_ext: any
    bg_image_url_ext: any
}

export type ContactType = {
    gid: string
    img: string
    url: string
    title: string
    category: string
    short_description: string
    long_description: string
    phone: string
    address: string
}

export interface Listing {
    contact: ListingType
}

export type RelatedType = {
    img: string
    title: string
    short_description: string
    url: string
    category: string
}

export interface RelatedProp {
    related: RelatedType[]
}

export interface RelatedCardProp {
    related: RelatedType
}

export type State = {
    name: string
    country_code: string
    iso2: string
}

export type StateAlt = {
    name: string
    country_code: string
    id: string
}

export type Country = {
    name: string
    id: string
    iso2: string
}

export interface CountryProp {
    countries: Country[]
}

export type CountryReformatted = {
    name: string
    iso2: string
}

export type City = {
    name: string
    country_code: string
    state_code: string
    id: string
}

export type Category = {
    name: string
    id: string
}

export type UserProfile = {
    email: string
    first_name: string
    img: string
    user_guid: string
    user_hash: string
    active: boolean
    deleted: boolean
    lastname: string
    country_code: string
    zipcode: string
    mobile: string
    address_one: string
    address_two: string
    city_id: string
    state_code: string
}

export type UserProp = {
    userProfile: UserProfile
}


export type ChangeEmailType = {
    email: string
    guid: string
}

export type Rating = {
    business_guid: string
    user_guid: string
    rating: number
    comment: string
    fullname: string
    rating_guid: string
}

export type LoginData = {
    username: string
    password: string
}

export const VerifiedStatus = {
    OK: true,
    PENDING: false
}

export const RequestType = {
    PASSWORD_RESET: "password_reset",
    CHANGE_PASSWORD: "change_password",
    CHANGE_EMAIL: "change_email"
}

export const RequestStatus = {
    OPEN: "open",
    CLOSED: "closed"
}

export interface BusinessHours {
    day: string;
    open: string;
    close: string;
}


export type RatingDisplayType = {
    totalReviews: number,
    category: string,
    rating: number,
    ratingCount: number
}

export type RatingDisplayProp = {
    data?: RatingDisplayType
}

export type ResetPasswordNewType = {
    password: string
    password2: string
}

export type UserProfileProps = {
    userProfile: UserProfile;
}

export interface CardTitleProp {
    children: ReactNode,
    guid: string,
    baseUrl: string
}

export interface ComponentProp {
    title: string
}

export interface SectionProp {
    title: string,
    subtitle: string
}

export type AddVideoType = {
    video_url: string
    video_title: string
    video_description: string
    business_guid: string
    user_guid: string
    video_guid: string
}

export interface AddVideoProp {
    video: AddVideoType
}

export interface VideoGalleryProps {
    videoGallery?: AddVideoType[],
    userGuid?: string,
    businessGuid?: string,
    listing?: ListingType
}

export interface GalleryItemProps {
    showCarousel(index: number): any,
    item: AddVideoType,
    itemIndex: number,
    userGuid?: string,
    businessGuid?: string
}



export interface GalleryItemMenuProps {
    item: AddVideoType,
    menu: boolean,
    userGuid?: string,
    businessGuid?: string
}


export type OutVideoType = {
    videoId: string | null,
    videoUrl: string,
    videoTitle: string,
    videoThumbnail: string,
    videoGuid: string
}

export type ProductType = {
    product_image_filename: string,
    user_guid: string,
    business_guid: string,
    product_guid: string,
    product_image_url: string,
    mimetype: string,
    product_title: string,
    product_description: string,
    product_link: string
    product_amount: any
    product_currency_country_id: any
}

export interface ProductGalleryProps {
    productGallery: ProductType[]
    listing: ListingType[]
    userGuid: string
    businessGuid: string
}

export interface ProductItemProps {
    showCarousel(index: number): any,
    product: ProductType,
    itemIndex: number,
    userGuid?: string,
    businessGuid?: string
}

export interface ProductItemMenuProps {
    product: ProductType
    menu: boolean
    userGuid?: string
    businessGuid?: string
}

export interface ProductDisplayProps {
    products: ProductType[]
    listing: ListingType
}

export interface ProductDisplayGalleryProps {
    products: ProductType[]
    setGalleryDialog: any
    listing: ListingType
}

export interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationData;
}


export type RatingsDataType = {
    rating_average: number
    rating_count: number
    rating_sum: number
}

export type BusinessRatingsType = {
    title: string
    experience: string
    quality: string
    customer_service: string
    communication: string
    value: string
    overall_satisfaction: string
    avgRating: string
    businessGuid: string
    userGuid: string
}

export type BusinessReviewType = {
    business_guid: string
    user_guid: string
    communication: string
    customer_service: string
    experience: string
    overall_satisfaction: string
    quality: string
    title: string
    value: string
    avg_rating: string
    rating_guid: string
    firstname: string
    lastname: string
    created_at: string
    updated_at: string
    city_name: string
    country_name: string
    img: string
}


export type ProfileImageType = {
    business_guid: string
    image_filename: string
    image_guid: string
    image_url: string
    mime_type: string
}

export type Currency = {
    id: number,
    country: string
    currency: string
    currency_name: string
    currency_symbol: string,
    currency_code: string,
    emoji: any
}


export type ServiceType = {
    user_guid: string,
    business_guid: string,
    service_guid: string,
    service_name: string,
    service_description: string,
    service_url: string
}

export type SysSocialMediaType = {
    name: string
    id: string
    base_url: string
}
export type SocialMediaType = {
    user_guid: string,
    business_guid: string,
    social_media_guid: string,
    social_media_code: string,
    social_media_identifier: string
    base_url: string
    social_media_name: string
}

export type SysFacilityType = {
    name: string
    id: string
    description: string
}

export type FacilityType = {
    facility_name: string
    user_guid: string,
    business_guid: string,
    facility_guid: string,
    facility_id: string,
    facility_description: string
}


export type CountryType = {
    name: string
    country_name: string
    id: string
    numeric_code: string
    phone_code: string
    currency: string
    currency_name: string
    currency_symbol: string
    lat: string
    lng: string
    emoji: any
    timezones: any
}