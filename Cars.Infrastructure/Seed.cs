using Cars.Domain;
using Microsoft.EntityFrameworkCore;

namespace Cars.Infrastructure;

public static class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (await context.Cars.AnyAsync()) return;

        var cars = new List<Car>
        {
            new Car
            {
                Brand = "Mazda",
                Model = "CX-60",
                DoorsNumber = 5,
                LuggageCapacity = 570,
                EngineCapacity = 2488,
                FuelType = FuelType.Hybrid,
                ProductionDate = DateTime.UtcNow.AddMonths(-6),
                AverageFuelConsumption = 1.5,
                BodyType = BodyType.SUV
            },
            new Car
            {
                Brand = "Toyota",
                Model = "Corolla",
                DoorsNumber = 4,
                LuggageCapacity = 470,
                EngineCapacity = 1798,
                FuelType = FuelType.Petrol,
                ProductionDate = DateTime.UtcNow.AddYears(-1),
                AverageFuelConsumption = 6.5,
                BodyType = BodyType.Sedan
            },
            new Car
            {
                Brand = "Volkswagen",
                Model = "Golf",
                DoorsNumber = 5,
                LuggageCapacity = 380,
                EngineCapacity = 1395,
                FuelType = FuelType.Diesel,
                ProductionDate = DateTime.UtcNow.AddYears(-2),
                AverageFuelConsumption = 4.5,
                BodyType = BodyType.Hatchback
            },
        };

        await context.Cars.AddRangeAsync(cars);
        await context.SaveChangesAsync();
    }
}