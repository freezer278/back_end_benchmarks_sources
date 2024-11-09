<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

        /**
         * @return User[] Returns an array of User objects
         */
        public function findRandom30Items(): array
        {
            $allItemsCount = $this->count();
            $itemsToTake = 30;
            $startId = rand(1, $allItemsCount - $itemsToTake);

            return $this->createQueryBuilder('u')
                ->select('u.id, u.name, u.email, u.email_verified_at, u.password, u.remember_token, u.created_at, u.updated_at')
                ->andWhere('u.id >= :startId')
                ->setParameter('startId', $startId)
                ->setMaxResults($itemsToTake)
                ->getQuery()
                ->getResult()
            ;
        }
}
