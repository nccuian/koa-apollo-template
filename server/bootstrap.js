export default async () => {
  const product = {
    name: 'The place where i fork Classic T-Shirt' ,
    shortDescription: '',
    description: `美國棉\n - 100%純棉預縮針織T恤\n - 180克/平方米(每平方碼5.3盎司)\n - RS運動輝：90%/10%polyester\n - 石楠/螢光：50%棉/50%polyester\n - 2cm無縫單針領口\n - 領圈和肩膀上有滾條\n - 雙針袖子和下擺摺邊\n`,
    ProductSpecs: [{
      name: '圓領',
      originalPrice: 599,
      price: 399,
      ProductSpecColors: [{
        id: '1c042059-817d-4683-8d5e-e69bf25da477',
        name: 'Black',
        hex: '#000000',
        ProductSpecColorResources:[{
          sorting: 0,
          type: 'image',
          path: 'https://imgur.com/dUbUkeI.jpg'
        }, {
          sorting: 1,
          type: 'image',
          path: 'https://imgur.com/e2WZzaE.jpg'
        }],
        ProductSpecColorSizes:[{
          id: '04e96709-3882-43a1-95ae-72103769188f',
          name: 'M',
          stock: 100,
          weight: 200,
        }, {
          id: '7b9416a9-0d89-4a3d-9a32-24d74c1f7dcd',
          name: 'L',
          stock: 100,
          weight: 200,
        }, {
          id: '45a763e0-90e9-4bc2-b4dc-d72aa4071910',
          name: 'XL',
          stock: 0,
          weight: 200,
        }, {
          id: '07df151a-5c95-490f-87c1-0ac454310a40',
          name: 'XXL',
          stock: 1,
          weight: 200,
        }]
      }, {
          id: '1c042059-817d-4683-8d5e-e69bf25da478',
          name: 'White',
          hex: '#ff0000',
          ProductSpecColorResources: [{
            sorting: 0,
            type: 'image',
            path: 'https://imgur.com/8akoX3V.jpg'
          }, {
            sorting: 1,
            type: 'image',
            path: 'https://imgur.com/e2WZzaE.jpg'
          }],
          ProductSpecColorSizes: [{
            id: '2e857326-a828-41c0-b063-6e9222c030ec',
            name: 'M',
            stock: 100,
            weight: 200,
          }, {
            id: 'cceebc5e-2927-4e05-a4f7-b6b7d416fb4a',
            name: 'L',
            stock: 100,
            weight: 200,
          }]
        }]
    }, {
        name: '馬克杯',
        originalPrice: 299,
        price: 199,
        ProductSpecColors: [{
          id: 'cddefd7b-3e9d-4252-8b79-7d39ed6777cb',
          name: 'Black',
          hex: '#000000',
          ProductSpecColorResources: [{
            sorting: 0,
            type: 'image',
            path: 'https://imgur.com/8akoX3V.jpg'
          }, {
            sorting: 1,
            type: 'image',
            path: 'https://imgur.com/8akoX3V.jpg'
          }],
          ProductSpecColorSizes: [{
            id: 'e8df9e69-3716-40ce-b41a-220019185517',
            name: 'M',
            stock: 100,
            weight: 200,
          }]
        }]
      }]
  }
  const createdProduct = await db.Product.create(product,{
    include:[{
      model: db.ProductSpec,
      include:[{
        model: db.ProductSpecColor,
        include:[{
          model: db.ProductSpecColorResource
        },{
          model: db.ProductSpecColorSize
        }]
      }]
    }]
  })

  const Countries = [{
    id: 'c8773408-ec7a-44d8-b952-0fad8c0c07f1',
    name: 'Taiwan',
    Fares:[{
      min: 0,
      max: 999999,
      amount: 74
    }]
  }, {
      id: 'd2affb3a-6d94-4f7a-ae2e-1d1e71b1948f',
      name: 'HongKong',
      Fares: [{
        min: 0,
        max: 500,
        amount: 240
      }, {
        min: 500,
        max: 1000,
        amount: 275
      }, {
        min: 1000,
        max: 1500,
        amount: 310
      }, {
        min: 1500,
        max: 2000,
        amount: 380
      }, {
        min: 2000,
        max: 2500,
        amount: 415
      }, {
        min: 2500,
        max: 3000,
        amount: 450
      }, {
        min: 3000,
        max: 3500,
        amount: 485
      }, {
        min: 3500,
        max: 999999,
        amount: 1000
      }
    ]
    }, {
      id: '35cc4fe9-df53-4f4d-9e0b-560af3b242f4',
      name: 'Macao',
      Fares: [{
        min: 0,
        max: 500,
        amount: 260
      }, {
        min: 500,
        max: 1000,
        amount: 305
      }, {
        min: 1000,
        max: 1500,
        amount: 350
      }, {
        min: 1500,
        max: 2000,
        amount: 395
      }, {
        min: 2000,
        max: 2500,
        amount: 440
      }, {
        min: 2500,
        max: 3000,
        amount: 485
      }, {
        min: 3000,
        max: 3500,
        amount: 530
      }, {
        min: 3500,
        max: 999999,
        amount: 1000
      }
      ]
    }, {
      id: '294d73ab-e9ab-4218-9f71-65a55d0ab4df',
      name: 'Singapore',
      Fares: [{
        min: 0,
        max: 500,
        amount: 220
      }, {
        min: 500,
        max: 1000,
        amount: 275
      }, {
        min: 1000,
        max: 1500,
        amount: 330
      }, {
        min: 1500,
        max: 2000,
        amount: 385
      }, {
        min: 2000,
        max: 2500,
        amount: 440
      }, {
        min: 2500,
        max: 3000,
        amount: 495
      }, {
        min: 3000,
        max: 3500,
        amount: 550
      }, {
        min: 3500,
        max: 999999,
        amount: 1000
      }
      ]
    }, {
      id: 'eb7b4404-be85-4ed5-8505-e7d539e4c597',
      name: 'Malaysia',
      Fares: [{
        min: 0,
        max: 500,
        amount: 170
      }, {
        min: 500,
        max: 1000,
        amount: 225
      }, {
        min: 1000,
        max: 1500,
        amount: 280
      }, {
        min: 1500,
        max: 2000,
        amount: 335
      }, {
        min: 2000,
        max: 2500,
        amount: 390
      }, {
        min: 2500,
        max: 3000,
        amount: 445
      }, {
        min: 3000,
        max: 3500,
        amount: 500
      }, {
        min: 3500,
        max: 999999,
        amount: 1000
      }
      ]
    },
    {
      id: '2555e722-0375-44e4-b57e-bd2ca7c9dd96',
      name: 'Japan',
      Fares: [{
        min: 0,
        max: 500,
        amount: 425
      }, {
        min: 500,
        max: 1000,
        amount: 480
      }, {
        min: 1000,
        max: 1500,
        amount: 535
      }, {
        min: 1500,
        max: 2000,
        amount: 590
      }, {
        min: 2000,
        max: 2500,
        amount: 645
      }, {
        min: 2500,
        max: 3000,
        amount: 700
      }, {
        min: 3000,
        max: 3500,
        amount: 755
      }, {
        min: 3500,
        max: 999999,
        amount: 1000
      }
      ]
    }
]

  await Promise.all(Countries.map(async(country)=>{
    await db.Country.create(country,{
      include:[{
        model: db.Fare
      }]
    })
  }))
  // await Promise.all(cardtypes.data.map(async(cardtype)=>{
  //   await db.CardType.create({
  //     id: cardtype.Id,
  //     name: cardtype.Name,
  //     sort: cardtype.Sort,
  //   })
  // }))
  // await Promise.all(cardkinds.data.map(async(cardkind)=>{
  //   await db.CardKind.create({
  //     id: cardkind.Id,
  //     name: cardkind.Name,
  //     sort: cardkind.Sort,
  //   })
  // }))
  // await Promise.all(cardlevels.data.map(async(cardlevel) => {
  //   await db.CardLevel.create({
  //     id: cardlevel.Id,
  //     name: cardlevel.Name,
  //     sort: cardlevel.Sort,
  //   })
  // }))
  // await Promise.all(propertys.data.map(async (property) => {
  //   db.CardProperty.create({
  //     id: property.Id,
  //     name: property.Name,
  //     sort: property.Sort,
  //   })
  // }))
  // await Promise.all(races.data.map(async(race) => {
  //   await db.CardRace.create({
  //     id: race.Id,
  //     name: race.Name,
  //     sort: race.Sort,
  //   })
  // }))
  
  // await Promise.all(packgroups.data.map(async (packgroup) => {
  //   await db.CardPackGroup.create({
  //     id: packgroup.Id,
  //     name: packgroup.Name,
  //     sort: packgroup.Sort,
  //   })
  // }))
  // await Promise.all(packs.data.map(async (pack)=>{
  //   await db.CardPack.create({
  //     id: pack.Id,
  //     name: pack.Name,
  //     sort: pack.Sort,
  //     number: pack.Number,
  //     saleDate: pack.SaleDate,
  //     CardPackGroupId: pack.PackGroupId,
  //     nickName: pack.NickName,
  //   })
  // }))
  // const details = carddetails.data.map((carddetail)=>{
  //   return  {
  //     id: carddetail.Id,
  //     cardName: carddetail.CardName,
  //     attack: carddetail.Attack,
  //     defence: carddetail.Defence,
  //     effect: carddetail.Effect,
  //     serialNumber: carddetail.SerialNumber,
  //     CardKindId: carddetail.KindId,
  //     CardLevelId: carddetail.LevelId,
  //     CardPropertyId: carddetail.PropertyId,
  //     CardRaceId: carddetail.RaceId
  //   }
  // })
  // await db.CardDetail.bulkCreate(details)

  // const cs = cards.data.map((card)=>{
  //   return  {
  //     id: card.Id,
  //     cardNumber: card.CardNumber,
  //     CardTypeId: card.CardTypeId,
  //     CardDetailId: card.CardDetailId,
  //     CardPackId: card.PackId,
  //     imgUrl: card.ImgUrl
  //   }
  // })
  // await db.Card.bulkCreate(cs)

  // const dbManager = await db.User.create({
  //   id: '07215e7c-ad45-420e-963a-ac5724a6f997',
  //   name: '老闆A',
  //   account: 'A1',
  //   password: 'manager'
  // })
}
