<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="main")
     * @Route("/posts/{id}", name="post-detail", requirements={"all"=".*"})
     */
    public function index( $all = null )
    {
        return $this->render('main/index.html.twig');
    }
}
