<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class AppController extends AbstractController
{
    #[Route('/api/v1/hello-world', name: 'hello_world')]
    public function helloWorld(): JsonResponse
    {
        return $this->json([
            'message' => 'Hello World',
        ]);
    }

    #[Route('/api/v1/users', name: 'users')]
    public function users(EntityManagerInterface $entityManager): JsonResponse
    {
        $results = $entityManager->getRepository(User::class)->findRandom30Items();

        return $this->json($results);
    }
}
