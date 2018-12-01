<?php

namespace App\Controller;

use App\Entity\Post;
use App\Form\PostType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class PostController extends AbstractController
{
    /**
	 * @Route(
	 *     name="post_upload",
	 *     path="/api/posts/upload",
	 *     defaults={"id"=null, "_api_respond"=true},
	 * 	   methods={"POST"}
	 * )
	 */
    public function upload( Request $request )
    {
		$post = new Post();
        $em = $this->getDoctrine()->getManager();
        
		// On crée le formulaire et on récupère les données de la requête
		$form = $this->createForm( PostType::class, $post );
		$form->handleRequest( $request );

		// Si le formulaire n'est pas soumis ou qu'il n'est pas valide...
		if ( !$form->isSubmitted() || !$form->isValid() )
		{
			// ... on lance une erreur 400
			throw new BadRequestHttpException();
		}

        $em->persist( $post );
		$em->flush();
		$post->setPictureFile( null );

		return $post;
    }
}
