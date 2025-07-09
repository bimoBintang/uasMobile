export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface ProdukRequest {
  nama: string
  quantity: number
  price: number
  jenis: string
  satuan?: 'PACK' | 'PCS' | 'KG' | 'LUSIN' | 'BALL'
  deskripsi?: string
}

export interface OrderRequest {
  alamat: string
  ongkir: number
  userId: string
  produkId: string
}

export interface DetailOrderRequest {
  orderId: string
}

export interface OrderUpdateRequest {
  status?: 'PENDING' | 'SUCCESS'
  alamat?: string
  ongkir?: number
}