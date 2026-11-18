using Cars.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace Cars.Application.Cars;

public class DeleteCarPhoto
{
    public class Command : IRequest<string?>
    {
        public Guid CarId { get; set; }
        public Guid PhotoId { get; set; }
    }
    public class Handler : IRequestHandler<Command, string?>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }
        public async Task<string?> Handle(Command request, CancellationToken cancellationToken)
        {
            var photo = await _context.CarPhotos.FirstOrDefaultAsync(
                p => p.Id == request.PhotoId && p.CarId == request.CarId,
                cancellationToken);

            if (photo is null)
            {
                return null;
            }

            var fileName = photo.FileName;
            var wasMain = photo.IsMain;

            _context.CarPhotos.Remove(photo);

            if (wasMain)
            {
                var nextMainPhoto = await _context.CarPhotos.FirstOrDefaultAsync(
                    p => p.CarId == request.CarId && p.Id != request.PhotoId,
                    cancellationToken);

                if (nextMainPhoto is not null)
                {
                    nextMainPhoto.IsMain = true;
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return fileName;
        }
    }
}