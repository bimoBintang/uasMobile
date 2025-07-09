// prisma/seed.ts
import { Satuan, Status } from "@/generated/prisma"
import { prisma } from "../src/lib/prisma"
import bcrypt from 'bcrypt'



async function main() {
  console.log('🌱 Starting seed...')

  // Hash password for users
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create Users (Admin and Customers)
  const users = await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@materialstore.com',
        password: hashedPassword,
        phone: '08123456789',
        role: 'ADMIN'
      },
      {
        username: 'john_contractor',
        email: 'john@contractor.com',
        password: hashedPassword,
        phone: '08234567890',
        role: 'CUSTOMER'
      },
      {
        username: 'siti_builder',
        email: 'siti@builder.com',
        password: hashedPassword,
        phone: '08345678901',
        role: 'CUSTOMER'
      },
      {
        username: 'budi_arsitek',
        email: 'budi@arsitek.com',
        password: hashedPassword,
        phone: '08456789012',
        role: 'CUSTOMER'
      },
      {
        username: 'maya_interior',
        email: 'maya@interior.com',
        password: hashedPassword,
        phone: '08567890123',
        role: 'CUSTOMER'
      }
    ]
  })

  console.log('✅ Users created:', users.count)

  // Get created users for reference
  const createdUsers = await prisma.user.findMany()
  const customers = createdUsers.filter((user: { role: string }) => user.role === 'CUSTOMER')

  // Create Products (Building Materials)
  const products = [
    // Semen (Cement)
    {
      nama: 'Semen Portland Tiga Roda',
      quantity: 150,
      price: 65000,
      jenis: 'Semen',
      satuan: Satuan.PACK,
      deskripsi: 'Semen portland berkualitas tinggi untuk konstruksi bangunan'
    },
    {
      nama: 'Semen Gresik',
      quantity: 200,
      price: 67000,
      jenis: 'Semen',
      satuan: Satuan.PACK,
      deskripsi: 'Semen premium untuk berbagai keperluan konstruksi'
    },
    {
      nama: 'Semen Holcim',
      quantity: 100,
      price: 69000,
      jenis: 'Semen',
      satuan: Satuan.PACK,
      deskripsi: 'Semen berkualitas internasional untuk proyek besar'
    },

    // Besi (Steel/Iron)
    {
      nama: 'Besi Beton Ulir 10mm',
      quantity: 50,
      price: 85000,
      jenis: 'Besi',
      satuan: Satuan.PCS,
      deskripsi: 'Besi beton ulir diameter 10mm panjang 12 meter'
    },
    {
      nama: 'Besi Beton Ulir 12mm',
      quantity: 40,
      price: 120000,
      jenis: 'Besi',
      satuan: Satuan.PCS,
      deskripsi: 'Besi beton ulir diameter 12mm panjang 12 meter'
    },
    {
      nama: 'Besi Beton Polos 8mm',
      quantity: 80,
      price: 65000,
      jenis: 'Besi',
      satuan: Satuan.PCS,
      deskripsi: 'Besi beton polos diameter 8mm panjang 12 meter'
    },
    {
      nama: 'Besi Siku 40x40mm',
      quantity: 30,
      price: 150000,
      jenis: 'Besi',
      satuan: Satuan.PCS,
      deskripsi: 'Besi siku 40x40mm panjang 6 meter untuk konstruksi'
    },

    // Pasir (Sand)
    {
      nama: 'Pasir Beton',
      quantity: 25,
      price: 350000,
      jenis: 'Pasir',
      satuan: Satuan.KG,
      deskripsi: 'Pasir beton berkualitas per kubik untuk cor beton'
    },
    {
      nama: 'Pasir Cor',
      quantity: 30,
      price: 320000,
      jenis: 'Pasir',
      satuan: Satuan.KG,
      deskripsi: 'Pasir cor halus untuk pengecoran'
    },
    {
      nama: 'Pasir Pasang',
      quantity: 40,
      price: 280000,
      jenis: 'Pasir',
      satuan: Satuan.KG,
      deskripsi: 'Pasir pasang untuk pemasangan batu bata'
    },

    // Kerikil/Split
    {
      nama: 'Split Beton 1-2cm',
      quantity: 20,
      price: 400000,
      jenis: 'Kerikil',
      satuan: Satuan.KG,
      deskripsi: 'Split beton ukuran 1-2cm per kubik'
    },
    {
      nama: 'Split Beton 2-3cm',
      quantity: 15,
      price: 420000,
      jenis: 'Kerikil',
      satuan: Satuan.KG,
      deskripsi: 'Split beton ukuran 2-3cm per kubik'
    },

    // Batu Bata
    {
      nama: 'Batu Bata Merah',
      quantity: 5000,
      price: 800,
      jenis: 'Batu Bata',
      satuan: Satuan.PCS,
      deskripsi: 'Batu bata merah berkualitas untuk dinding'
    },
    {
      nama: 'Batako Press',
      quantity: 2000,
      price: 2500,
      jenis: 'Batu Bata',
      satuan: Satuan.PCS,
      deskripsi: 'Batako press untuk dinding non-struktural'
    },
    {
      nama: 'Hebel AAC 10cm',
      quantity: 500,
      price: 45000,
      jenis: 'Batu Bata',
      satuan: Satuan.PCS,
      deskripsi: 'Hebel AAC ringan tebal 10cm'
    },

    // Genteng
    {
      nama: 'Genteng Keramik KIA',
      quantity: 1000,
      price: 8500,
      jenis: 'Genteng',
      satuan: Satuan.PCS,
      deskripsi: 'Genteng keramik berkualitas tahan lama'
    },
    {
      nama: 'Genteng Beton',
      quantity: 800,
      price: 6000,
      jenis: 'Genteng',
      satuan: Satuan.PCS,
      deskripsi: 'Genteng beton untuk atap rumah'
    },
    {
      nama: 'Genteng Metal',
      quantity: 300,
      price: 85000,
      jenis: 'Genteng',
      satuan: Satuan.PCS,
      deskripsi: 'Genteng metal spandek per lembar'
    },

    // Keramik
    {
      nama: 'Keramik Lantai 40x40',
      quantity: 2000,
      price: 45000,
      jenis: 'Keramik',
      satuan: Satuan.PCS,
      deskripsi: 'Keramik lantai ukuran 40x40cm motif marmer'
    },
    {
      nama: 'Keramik Dinding 25x40',
      quantity: 1500,
      price: 38000,
      jenis: 'Keramik',
      satuan: Satuan.PCS,
      deskripsi: 'Keramik dinding kamar mandi ukuran 25x40cm'
    },
    {
      nama: 'Granit Tile 60x60',
      quantity: 800,
      price: 125000,
      jenis: 'Keramik',
      satuan: Satuan.PCS,
      deskripsi: 'Granit tile premium ukuran 60x60cm'
    },

    // Cat
    {
      nama: 'Cat Tembok Dulux 5kg',
      quantity: 100,
      price: 280000,
      jenis: 'Cat',
      satuan: Satuan.PCS,
      deskripsi: 'Cat tembok interior Dulux 5kg warna putih'
    },
    {
      nama: 'Cat Kayu Propan 1kg',
      quantity: 80,
      price: 75000,
      jenis: 'Cat',
      satuan: Satuan.PCS,
      deskripsi: 'Cat kayu dan besi Propan 1kg berbagai warna'
    },
    {
      nama: 'Cat Genteng 4kg',
      quantity: 50,
      price: 180000,
      jenis: 'Cat',
      satuan: Satuan.PCS,
      deskripsi: 'Cat genteng tahan cuaca 4kg'
    },

    // Pipa
    {
      nama: 'Pipa PVC 3 inch',
      quantity: 200,
      price: 85000,
      jenis: 'Pipa',
      satuan: Satuan.PCS,
      deskripsi: 'Pipa PVC 3 inch panjang 4 meter'
    },
    {
      nama: 'Pipa PVC 4 inch',
      quantity: 150,
      price: 120000,
      jenis: 'Pipa',
      satuan: Satuan.PCS,
      deskripsi: 'Pipa PVC 4 inch panjang 4 meter'
    },
    {
      nama: 'Pipa Galvanis 1/2 inch',
      quantity: 100,
      price: 45000,
      jenis: 'Pipa',
      satuan: Satuan.PCS,
      deskripsi: 'Pipa galvanis 1/2 inch panjang 6 meter'
    },

    // Kawat
    {
      nama: 'Kawat Bendrat',
      quantity: 500,
      price: 25000,
      jenis: 'Kawat',
      satuan: Satuan.KG,
      deskripsi: 'Kawat bendrat untuk mengikat besi beton'
    },
    {
      nama: 'Kawat Bronjong',
      quantity: 200,
      price: 85000,
      jenis: 'Kawat',
      satuan: Satuan.KG,
      deskripsi: 'Kawat bronjong untuk penahan tanah'
    },

    // Kayu
    {
      nama: 'Kayu Balok 5/7',
      quantity: 300,
      price: 45000,
      jenis: 'Kayu',
      satuan: Satuan.PCS,
      deskripsi: 'Kayu balok ukuran 5/7cm panjang 4 meter'
    },
    {
      nama: 'Kayu Papan 3/20',
      quantity: 200,
      price: 55000,
      jenis: 'Kayu',
      satuan: Satuan.PCS,
      deskripsi: 'Kayu papan ukuran 3/20cm panjang 4 meter'
    },
    {
      nama: 'Kayu Usuk 4/6',
      quantity: 400,
      price: 35000,
      jenis: 'Kayu',
      satuan: Satuan.PCS,
      deskripsi: 'Kayu usuk ukuran 4/6cm panjang 4 meter'
    },

    // Kaca
    {
      nama: 'Kaca Bening 5mm',
      quantity: 100,
      price: 65000,
      jenis: 'Kaca',
      satuan: Satuan.PCS,
      deskripsi: 'Kaca bening tebal 5mm per meter persegi'
    },
    {
      nama: 'Kaca Es 6mm',
      quantity: 80,
      price: 75000,
      jenis: 'Kaca',
      satuan: Satuan.PCS,
      deskripsi: 'Kaca es tebal 6mm per meter persegi'
    }
  ]

  // Create products
  const createdProducts = []
  for (const product of products) {
    const createdProduct = await prisma.produk.create({
      data: product
    })
    createdProducts.push(createdProduct)
  }

  console.log('✅ Products created:', createdProducts.length)

  // Create sample orders
  const sampleOrders = [
    {
      alamat: 'Jl. Sudirman No. 123, Jakarta Pusat',
      ongkir: 75000,
      userId: customers[0].id,
      produkId: createdProducts[0].id, // Semen Portland
      status: Status.PENDING
    },
    {
      alamat: 'Jl. Gatot Subroto No. 456, Jakarta Selatan',
      ongkir: 50000,
      userId: customers[1].id,
      produkId: createdProducts[3].id, // Besi Beton Ulir 10mm
      status: Status.PENDING
    },
    {
      alamat: 'Jl. Thamrin No. 789, Jakarta Pusat',
      ongkir: 85000,
      userId: customers[2].id,
      produkId: createdProducts[7].id, // Pasir Beton
      status: Status.SUCCESS
    },
    {
      alamat: 'Jl. Kuningan No. 321, Jakarta Selatan',
      ongkir: 60000,
      userId: customers[3].id,
      produkId: createdProducts[12].id, // Batu Bata Merah
      status: Status.PENDING
    },
    {
      alamat: 'Jl. Menteng No. 654, Jakarta Pusat',
      ongkir: 90000,
      userId: customers[0].id,
      produkId: createdProducts[15].id, // Genteng Keramik
      status: Status.SUCCESS
    },
    {
      alamat: 'Jl. Kemang No. 987, Jakarta Selatan',
      ongkir: 70000,
      userId: customers[1].id,
      produkId: createdProducts[18].id, // Keramik Lantai
      status: Status.PENDING
    },
    {
      alamat: 'Jl. Senayan No. 147, Jakarta Pusat',
      ongkir: 55000,
      userId: customers[2].id,
      produkId: createdProducts[21].id, // Cat Tembok Dulux
      status: Status.SUCCESS
    },
    {
      alamat: 'Jl. Blok M No. 258, Jakarta Selatan',
      ongkir: 80000,
      userId: customers[3].id,
      produkId: createdProducts[24].id, // Pipa PVC 3 inch
      status: Status.PENDING
    }
  ]

  // Create orders
  const createdOrders = []
  for (const order of sampleOrders) {
    const createdOrder = await prisma.order.create({
      data: order
    })
    createdOrders.push(createdOrder)
  }

  console.log('✅ Orders created:', createdOrders.length)

  // Create detail orders for each order
  const detailOrders = []
  for (const order of createdOrders) {
    // Create 1-3 detail orders per order
    const detailCount = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < detailCount; i++) {
      const detailOrder = await prisma.detailOrder.create({
        data: {
          orderId: order.id
        }
      })
      detailOrders.push(detailOrder)
    }
  }

  console.log('✅ Detail orders created:', detailOrders.length)

  // Summary
  console.log('\n🎉 Seed completed successfully!')
  console.log(`📊 Summary:`)
  console.log(`   - Users: ${users.count}`)
  console.log(`   - Products: ${createdProducts.length}`)
  console.log(`   - Orders: ${createdOrders.length}`)
  console.log(`   - Detail Orders: ${detailOrders.length}`)
  console.log('\n📋 Test credentials:')
  console.log(`   Admin: admin@materialstore.com / password123`)
  console.log(`   Customer: john@contractor.com / password123`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

