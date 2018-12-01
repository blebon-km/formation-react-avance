<?php

namespace App\EventSubscriber;

use App\Entity\Comment;
use AppBundle\Entity\Like;
use AppBundle\Entity\Match;
use App\Repository\PostRepository;
use AppBundle\Service\NotificationPusher;
use AppBundle\Security\CurrentUserProvider;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class CommentEventSubscriber implements EventSubscriberInterface
{
	private $postRepository;

	public function __construct( PostRepository $postRepository )
	{
        $this->postRepository = $postRepository;
	}

	public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
            	['attachPost', EventPriorities::PRE_VALIDATE]
            ],
        ];
    }

    public function attachPost(GetResponseForControllerResultEvent $event)
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ( !( $entity instanceof Comment ) || Request::METHOD_POST !== $method ) {
            return;
        }

        $entity->setPost( $this->postRepository->find( $entity->postId ) );
    }
}