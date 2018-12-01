<?php

namespace App\Filter;

use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\RequestStack;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\FilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;

final class HashtagFilter implements FilterInterface
{
    protected $requestStack;

    public function __construct( RequestStack $requestStack ) {
        $this->requestStack = $requestStack;
    }

    public function apply(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $hashtag = $this->requestStack->getMasterRequest()->query->get( 'hashtag', null );
        if ( $hashtag )
        {
            $parameterName = $queryNameGenerator->generateParameterName('description'); // Generate a unique parameter name to avoid collisions with other filters
            $queryBuilder
                ->andWhere(sprintf('o.%s LIKE :%s', 'description', $parameterName))
                ->setParameter($parameterName, '%#' . $hashtag . '%');
        }
    }

    // This function is only used to hook in documentation generators (supported by Swagger and Hydra)
    public function getDescription(string $resourceClass): array
    {
        return [
            'hashtag' => [
                'property' => 'description',
                'type' => 'string',
                'required' => false,
                'swagger' => [
                    'description' => 'Filtering by hashtag',
                    'name' => 'hashtag',
                    'type' => 'string',
                ]
            ]
        ];
    }
}