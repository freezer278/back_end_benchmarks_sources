<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

    #[Route('/api/v1/jwt', name: 'jwt')]
    public function jwt(EntityManagerInterface $entityManager): JsonResponse
    {
        $key = 'some_private_jwt_key_string';
        $userId = 321321;
        $tokenId = 87484;
        $currentTime = time();
        $payload = [
            'iss' => 'http://example.org',
            'aud' => 'http://example.com',
            'iat' => $currentTime,
            'exp' => $currentTime + 3600,
            'sub' => $userId,

        ];
        $algorithm = 'HS256';

        $jwt = JWT::encode($payload, $key, $algorithm);

        $decoded = (array)JWT::decode($jwt, new Key($key, $algorithm));

        return $this->json($decoded);
    }
}
