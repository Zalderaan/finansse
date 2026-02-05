import prisma from "./db";

async function main() {
    // seeding data into categories table
    const entertainment = await prisma.category.create({
        data: {
            category_name: "Entertainment & Leisure",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const shopping = await prisma.category.create({
        data: {
            category_name: "Shopping",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const essentials = await prisma.category.create({
        data: {
            category_name: "Essentials",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const misc = await prisma.category.create({
        data: {
            category_name: "Miscellaeneous",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const savings = await prisma.category.create({
        data: {
            category_name: "Savings & Investments",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const family = await prisma.category.create({
        data: {
            category_name: "Family & Others",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const education = await prisma.category.create({
        data: {
            category_name: "Education",
            category_type: "EXPENSE",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const salary = await prisma.category.create({
        data: {
            category_name: "Salary",
            category_type: "INCOME",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    });

    const allowance = await prisma.category.create({
        data: {
            category_name: "Savings & Investments",
            category_type: "INCOME",
            category_icon: null,
            category_isDefault: true,
            user_id: null,
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })